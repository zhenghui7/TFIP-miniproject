package sg.edu.nus.iss.app.Backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import sg.edu.nus.iss.app.Backend.models.Board;
import sg.edu.nus.iss.app.Backend.services.GameService;

@Controller
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class GameController {

    @Autowired
    GameService gameService;

    @PostMapping(path = "/game", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseBody
    public ResponseEntity<String> uploadAndRetrieve(@RequestBody MultiValueMap<String, String> form) {

        String name = form.getFirst("name");
        float timer = Float.parseFloat(form.getFirst("timer"));
        String difficulty = form.getFirst("difficulty");

        List<Board> leaderboard = gameService.uploadAndRetrieve(name, timer, difficulty);

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        for (Board l : leaderboard) {
            arrayBuilder.add(
                    Json.createObjectBuilder()
                            .add("name", l.name())
                            .add("timer", l.timer())
                            .build());
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(arrayBuilder.build().toString());

    }

    @GetMapping(path = "/game/{difficulty}")
    @ResponseBody
    public ResponseEntity<String> retrieveLeaderboard(@PathVariable String difficulty) {

        List<Board> leaderboard = gameService.retrieveLeaderboard(difficulty);
        
        if (leaderboard.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Json.createObjectBuilder().add("Empty", "Empty leaderboard")
                            .build().toString());
        }

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        for (Board l : leaderboard) {
            arrayBuilder.add(
                    Json.createObjectBuilder()
                            .add("name", l.name())
                            .add("timer", l.timer())
                            .build());
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(arrayBuilder.build().toString());
    }

}
