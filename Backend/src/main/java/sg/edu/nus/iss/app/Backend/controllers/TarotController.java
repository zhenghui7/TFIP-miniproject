package sg.edu.nus.iss.app.Backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import sg.edu.nus.iss.app.Backend.models.TarotResult;
import sg.edu.nus.iss.app.Backend.services.TarotService;

@Controller
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class TarotController {

    @Autowired
    TarotService tarotSvc;

    @GetMapping(path = "/tarot/{pastSelected}/{presentSelected}/{futureSelected}")
    @ResponseBody
    public ResponseEntity<String> retrieveResult(@PathVariable String pastSelected,
            @PathVariable String presentSelected, @PathVariable String futureSelected) {

        boolean hasEmptyBundle = false;

        List<TarotResult> tarotResultList = tarotSvc.retrieveTarotResult(pastSelected + ".jpg",
                presentSelected + ".jpg", futureSelected + ".jpg");

        for (TarotResult rs : tarotResultList) {
            if (rs == null) {
                hasEmptyBundle = true;
                break;
            }
        }

        if (hasEmptyBundle) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Json.createObjectBuilder()
                            .add("Error", "CardId not found! Please select again by clicking on the cards")
                            .build().toString());
        }

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        for (TarotResult t : tarotResultList) {
            arrayBuilder.add(
                    Json.createObjectBuilder()
                            .add("name", t.name())
                            .add("fortuneTelling", t.fortuneTelling().toString())
                            .build());
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(arrayBuilder.build().toString());

    }
}
