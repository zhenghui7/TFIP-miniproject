package sg.edu.nus.iss.app.Backend.websocket;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import sg.edu.nus.iss.app.Backend.models.Message;
import sg.edu.nus.iss.app.Backend.repositories.MessageRepository;

@Component
public class ChatEndpoint extends TextWebSocketHandler {
    private WebSocketSession session;
    private static final Set<ChatEndpoint> chatEndpoints = new CopyOnWriteArraySet<>();
    private static HashMap<String, String> users = new HashMap<>();

    @Autowired
    private MessageEncoder messageEncoder;

    @Autowired
    private MessageDecoder messageDecoder;

    @Autowired
    private MessageRepository messageRepository;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {

        String username = extractUsername(session.getUri().toString());

        this.session = session;
        chatEndpoints.add(this);

        // Extract the username from the session attributes
        users.put(session.getId(), username);

        Message message = new Message();
        message.setFrom(username + " | (" + getTimeNow() + ")");
        message.setContent("Connected!");
        broadcast(message);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage textMessage) throws IOException {
        Message message = messageDecoder.convert(textMessage);
        if ("request_past_messages".equals(message.getContent())) {
            sendPastMessages(session);
        } else {
            message.setFrom(users.get(session.getId()) + " | (" + getTimeNow() + ")");
            broadcast(message);
        }
    }

    private void sendPastMessages(WebSocketSession session) throws IOException {
        List<Message> pastMessages = messageRepository.findAll();
        for (Message message : pastMessages) {
            String json = (String) messageEncoder.convert(message).getPayload();
            TextMessage textMessage = new TextMessage(json);
            session.sendMessage(textMessage);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException {
        chatEndpoints.remove(this);
        Message message = new Message();
        message.setFrom(users.get(session.getId())  + " | (" + getTimeNow() + ")");
        message.setContent("Disconnected!");
        broadcast(message);
    }

    private void broadcast(Message message) throws IOException {

        messageRepository.saveMessage(message);

        String json = (String) messageEncoder.convert(message).getPayload();
        System.out.println(">>>>>>> json string before broadcast: " + json);

        TextMessage textMessage = new TextMessage(json);
        chatEndpoints.forEach(endpoint -> {
            synchronized (endpoint) {
                try {
                    endpoint.session.sendMessage(textMessage);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private String extractUsername(String uri) {
        int lastIndex = uri.lastIndexOf("/");
        String encodedUsername = uri.substring(lastIndex + 1);
        try {
            return URLDecoder.decode(encodedUsername, StandardCharsets.UTF_8.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return ""; 
        }
    }

    private String getTimeNow() {
        LocalDateTime postedTime = LocalDateTime.now(); // eg. this.getPosted();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        return postedTime.format(formatter);
    }

}
