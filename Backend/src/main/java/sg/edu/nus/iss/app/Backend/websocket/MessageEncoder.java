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