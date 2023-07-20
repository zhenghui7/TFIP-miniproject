// package sg.edu.nus.iss.app.Backend.websocket;

// import org.springframework.http.server.ServerHttpRequest;
// import org.springframework.http.server.ServerHttpResponse;
// import org.springframework.web.socket.WebSocketHandler;
// import org.springframework.web.socket.server.HandshakeInterceptor;

// public class AllowCredentialsHandshakeInterceptor implements HandshakeInterceptor {

//     @Override
//     public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
//             java.util.Map<String, Object> attributes) throws Exception {
//         response.getHeaders().add("Access-Control-Allow-Origin", request.getHeaders().getOrigin());
//         response.getHeaders().add("Access-Control-Allow-Credentials", "true");
//         return true;
//     }

//     @Override
//     public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
//             Exception exception) {
//         // Do nothing after the handshake
//     }
// }
