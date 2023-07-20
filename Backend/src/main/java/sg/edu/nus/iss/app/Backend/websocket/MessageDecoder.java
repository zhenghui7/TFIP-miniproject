package sg.edu.nus.iss.app.Backend.websocket;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;

import com.google.gson.Gson;

import sg.edu.nus.iss.app.Backend.models.Message;

@Component
public class MessageDecoder implements Converter<WebSocketMessage<?>, Message> {

    private static Gson gson = new Gson();

    @Override
    public Message convert(WebSocketMessage<?> source) {
        String payload = ((TextMessage) source).getPayload();
        return gson.fromJson(payload, Message.class);
    }
}


// package sg.edu.nus.iss.app.Backend.websocket;

// import javax.websocket.DecodeException;
// import javax.websocket.Decoder;
// import javax.websocket.EndpointConfig;

// import com.google.gson.Gson;

// import sg.edu.nus.iss.app.Backend.models.Message;

// public class MessageDecoder implements Decoder.Text<Message> {

//     private static Gson gson = new Gson();

//     @Override
//     public Message decode(String s) throws DecodeException {
//         Message message = gson.fromJson(s, Message.class);
//         return message;
//     }

//     @Override
//     public boolean willDecode(String s) {
//         return (s != null);
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