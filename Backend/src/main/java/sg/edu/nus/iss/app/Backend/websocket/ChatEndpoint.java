package sg.edu.nus.iss.app.Backend.websocket;

import java.io.IOException;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import sg.edu.nus.iss.app.Backend.models.Message;

@Component
public class ChatEndpoint extends TextWebSocketHandler {
    private WebSocketSession session;
    private static final Set<ChatEndpoint> chatEndpoints = new CopyOnWriteArraySet<>();
    private static HashMap<String, String> users = new HashMap<>();

    @Autowired
    private MessageEncoder messageEncoder;

    @Autowired
    private MessageDecoder messageDecoder;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        this.session = session;
        chatEndpoints.add(this);

        // Extract the username from the session attributes
        String username = (String) session.getAttributes().get("username");
        users.put(session.getId(), username);

        Message message = new Message();
        message.setFrom(username);
        message.setContent("Connected!");
        broadcast(message);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage textMessage) throws IOException {
        Message message = messageDecoder.convert(textMessage);
        message.setFrom(users.get(session.getId()));
        broadcast(message);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException {
        chatEndpoints.remove(this);
        Message message = new Message();
        message.setFrom(users.get(session.getId()));
        message.setContent("Disconnected!");
        broadcast(message);
    }

    private void broadcast(Message message) throws IOException {
        String json = (String) messageEncoder.convert(message).getPayload();
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
}


// package sg.edu.nus.iss.app.Backend.websocket;

// import java.io.IOException;
// import java.util.HashMap;
// import java.util.Set;
// import java.util.concurrent.CopyOnWriteArraySet;

// import javax.websocket.EncodeException;
// import javax.websocket.OnClose;
// import javax.websocket.OnError;
// import javax.websocket.OnMessage;
// import javax.websocket.OnOpen;
// import javax.websocket.Session;
// import javax.websocket.server.PathParam;
// import javax.websocket.server.ServerEndpoint;

// import org.springframework.web.bind.annotation.CrossOrigin;

// import sg.edu.nus.iss.app.Backend.models.Message;

// @ServerEndpoint(value = "/chat/{username}", decoders = MessageDecoder.class, encoders = MessageEncoder.class)
// @CrossOrigin(origins = "http://localhost:4200") 
// public class ChatEndpoint {
//     private Session session;
//     private static final Set<ChatEndpoint> chatEndpoints = new CopyOnWriteArraySet<>();
//     private static HashMap<String, String> users = new HashMap<>();

//     @OnOpen
//     public void onOpen(Session session, @PathParam("username") String username) throws IOException, EncodeException {

//         this.session = session;
//         chatEndpoints.add(this);
//         users.put(session.getId(), username);

//         Message message = new Message();
//         message.setFrom(username);
//         message.setContent("Connected!");
//         broadcast(message);
//     }

//     @OnMessage
//     public void onMessage(Session session, Message message) throws IOException, EncodeException {
//         message.setFrom(users.get(session.getId()));
//         broadcast(message);
//     }

//     @OnClose
//     public void onClose(Session session) throws IOException, EncodeException {
//         chatEndpoints.remove(this);
//         Message message = new Message();
//         message.setFrom(users.get(session.getId()));
//         message.setContent("Disconnected!");
//         broadcast(message);
//     }

//     @OnError
//     public void onError(Session session, Throwable throwable) {
//         // Do error handling here
//     }

//     private static void broadcast(Message message) throws IOException, EncodeException {
//         chatEndpoints.forEach(endpoint -> {
//             synchronized (endpoint) {
//                 try {
//                     endpoint.session.getBasicRemote()
//                         .sendObject(message);
//                 } catch (IOException | EncodeException e) {
//                     e.printStackTrace();
//                 }
//             }
//         });
//     }

// }