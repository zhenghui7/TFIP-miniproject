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