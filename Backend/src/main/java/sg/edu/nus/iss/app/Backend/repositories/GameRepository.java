package sg.edu.nus.iss.app.Backend.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.app.Backend.models.Board;

@Repository
public class GameRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void upload(String name, float timer, String difficulty) {

        String sqlQuery = "INSERT INTO " + difficulty + " (name, timer) VALUES (?, ?)";

        jdbcTemplate.update(sqlQuery, name, timer);
    }

    public List<Board> retrieve(String difficulty) {

        String sqlQuery = "select * from " + difficulty + " order by timer asc limit 10";

        return jdbcTemplate.query(sqlQuery, (rs, rownum) -> {
            String name = rs.getString("name");
            float timer = rs.getFloat("timer");
            return new Board(name, timer);
        });
    }

}
