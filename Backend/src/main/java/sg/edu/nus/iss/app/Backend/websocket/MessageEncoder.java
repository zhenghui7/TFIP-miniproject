package sg.edu.nus.iss.app.Backend.websocket;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;

import com.google.gson.Gson;

import sg.edu.nus.iss.app.Backend.models.Message;

@Component
public class MessageEncoder implements Converter<Message, WebSocketMessage<?>> {

    private static Gson gson = new Gson();

    @Override
    public WebSocketMessage<?> convert(Message source) {
        String json = gson.toJson(source);
        return new TextMessage(json);
    }
}


// package sg.edu.nus.iss.app.Backend.websocket;

// import javax.websocket.EncodeException;
// import javax.websocket.Encoder;
// import javax.websocket.EndpointConfig;

// import com.google.gson.Gson;

// import sg.edu.nus.iss.app.Backend.models.Message;

// public class MessageEncoder implements Encoder.Text<Message> {

//     private static Gson gson = new Gson();

//     @Override
//     public String encode(Message message) throws EncodeException {
//         String json = gson.toJson(message);
//         return json;
//     }

//     @Override
//     public void init(EndpointConfig endpointConfig) {
//         // Custom initialization logic
//     }

//     @Override
//     public void destroy() {
//         // Close resources
//     }
// }