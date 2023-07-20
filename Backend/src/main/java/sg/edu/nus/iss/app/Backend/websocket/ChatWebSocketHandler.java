// package sg.edu.nus.iss.app.Backend.websocket;

// import java.io.IOException;
// import java.util.HashMap;
// import java.util.Map;
// import java.util.concurrent.CopyOnWriteArraySet;

// import org.springframework.stereotype.Component;
// import org.springframework.web.socket.CloseStatus;
// import org.springframework.web.socket.TextMessage;
// import org.springframework.web.socket.WebSocketSession;
// import org.springframework.web.socket.handler.TextWebSocketHandler;

// import com.google.gson.Gson;

// import sg.edu.nus.iss.app.Backend.models.Message;

// @Component
// public class ChatWebSocketHandler extends TextWebSocketHandler {
//     private static final CopyOnWriteArraySet<WebSocketSession> sessions = new CopyOnWriteArraySet<>();
//     private static final Map<WebSocketSession, String> users = new HashMap<>();

//     @Override
//     public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//         sessions.add(session);
//     }

//     @Override
//     protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//         String payload = message.getPayload();
//         Message chatMessage = new Gson().fromJson(payload, Message.class);
//         String username = users.get(session);

//         if (username == null) {
//             // Set the username when the WebSocket connection is established
//             username = chatMessage.getFrom();
//             users.put(session, username);
//         }

//         broadcastMessage(chatMessage);
//     }

//     @Override
//     public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
//         sessions.remove(session);
//         users.remove(session);
//     }

//     private void broadcastMessage(Message message) {
//         TextMessage textMessage = new TextMessage(new Gson().toJson(message));
//         sessions.forEach(session -> {
//             synchronized (session) {
//                 try {
//                     session.sendMessage(textMessage);
//                 } catch (IOException e) {
//                     e.printStackTrace();
//                 }
//             }
//         });
//     }
// }
