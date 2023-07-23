package sg.edu.nus.iss.app.Backend.models;

import java.util.List;

public class Message {
    private String from;
    private String content;
    private List<String> users;

    public Message(String from, String content) {
        this.from = from;
        this.content = content;
    }

    public Message() {
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }

}
