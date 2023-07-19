package sg.edu.nus.iss.app.Backend.controllers;

import java.io.IOException;

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
import sg.edu.nus.iss.app.Backend.models.DailyHoroscope;
import sg.edu.nus.iss.app.Backend.models.MonthlyHoroscope;
import sg.edu.nus.iss.app.Backend.services.HoroscopeService;

@Controller
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class HoroscopeController {

    @Autowired
    HoroscopeService horoscopeSvc;

    @GetMapping(path = "/horoscope/{sign}")
    @ResponseBody
    public ResponseEntity<String> getHoroscope(@PathVariable String sign) {

        try {
            DailyHoroscope todayHoroscope = this.horoscopeSvc.getTodayHoroscope(sign);
            DailyHoroscope tomorrowHoroscope = this.horoscopeSvc.getTomorrowHoroscope(sign);
            MonthlyHoroscope monthlyHoroscope = this.horoscopeSvc.getMonthlyHoroscope(sign);

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(Json.createObjectBuilder()
                            .add("today", todayHoroscope.toString())
                            .add("tomorrow", tomorrowHoroscope.toString())
                            .add("monthly", monthlyHoroscope.toString())
                            .build().toString());

        } catch (IOException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Json.createObjectBuilder()
                            .add("Error", "Please select your Zodiac Sign again")
                            .build().toString());
        }

    }

}