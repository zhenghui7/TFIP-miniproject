package sg.edu.nus.iss.app.Backend.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private ChatEndpoint chatEndpoint;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatEndpoint, "/chat/{username}").setAllowedOrigins("*");
    }
}


// package sg.edu.nus.iss.app.Backend.websocket;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.socket.config.annotation.EnableWebSocket;
// import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
// import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

// @Configuration
// @EnableWebSocket
// public class WebSocketConfig implements WebSocketConfigurer {

//     @Override
//     public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//         registry.addHandler(new ChatWebSocketHandler(), "/chat/{username}")
//                 .setAllowedOrigins("http://localhost:4200") // Add your Angular app URL
//                 .addInterceptors(new AllowCredentialsHandshakeInterceptor())
//                 .withSockJS();
//     }

//     // Rest of the configuration methods (if needed) can be kept as is.
// }



