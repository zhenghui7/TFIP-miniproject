package sg.edu.nus.iss.app.Backend.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.app.Backend.models.Message;

@Repository
public class MessageRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void saveMessage(Message message) {

        String sqlQuery = "INSERT INTO messages (name, content) VALUES (?, ?)";

        jdbcTemplate.update(sqlQuery, message.getFrom(), message.getContent());
    }

    public List<Message> findAll() {

        String sqlQuery = "select * from messages order by id asc";
        
        return jdbcTemplate.query(sqlQuery, (rs, rownum) -> {
            String from = rs.getString("name");
            String content = rs.getString("content");
            return new Message (from, content);
        });
    }

}
