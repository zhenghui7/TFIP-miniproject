package sg.edu.nus.iss.app.Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
// @SpringBootApplication
// @EnableWebSocket
// public class BackendApplication implements WebSocketConfigurer {
//     public static void main(String[] args) {
//         SpringApplication.run(BackendApplication.class, args);
//     }

//     @Override
//     public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//         registry.addHandler(new ChatWebSocketHandler(), "/chat/{username}")
//                 .setAllowedOrigins("http://localhost:4200");
//     }

	
// }