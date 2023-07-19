package sg.edu.nus.iss.app.Backend.services;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import sg.edu.nus.iss.app.Backend.models.DailyHoroscope;
import sg.edu.nus.iss.app.Backend.models.MonthlyHoroscope;

@Service
public class HoroscopeService {

    public static final String GET_TODAY_URL = "https://json.astrologyapi.com/v1/sun_sign_prediction/daily/";
    public static final String GET_TOMORROW_URL = "https://json.astrologyapi.com/v1/sun_sign_prediction/daily/next/";
    public static final String GET_MONTHLY_URL = "https://json.astrologyapi.com/v1/horoscope_prediction/monthly/";

    @Value("${horoscope.api.id}")
    private String horoscopeApiId;

    @Value("${horoscope.api.key}")
    private String horoscopeApiKey;

    public DailyHoroscope getTodayHoroscope(String sign) throws IOException {

        String url = GET_TODAY_URL + sign;

        ResponseEntity<String> ApiResponse = externalApiRequest(url);
        DailyHoroscope dailyHoroscope = DailyHoroscope.create(ApiResponse.getBody());

        return dailyHoroscope;
    }

    public DailyHoroscope getTomorrowHoroscope(String sign) throws IOException {
        String url = GET_TOMORROW_URL + sign;

        ResponseEntity<String> ApiResponse = externalApiRequest(url);
        DailyHoroscope dailyHoroscope = DailyHoroscope.create(ApiResponse.getBody());

        return dailyHoroscope;
    }

    public MonthlyHoroscope getMonthlyHoroscope(String sign) throws IOException {
        String url = GET_MONTHLY_URL + sign;

        ResponseEntity<String> ApiResponse = externalApiRequest(url);
        MonthlyHoroscope monthlyHoroscope = MonthlyHoroscope.create(ApiResponse.getBody());

        return monthlyHoroscope;
    }

    private ResponseEntity<String> externalApiRequest(String url) {

        String auth = Base64.getEncoder().encodeToString((horoscopeApiId + ":" + horoscopeApiKey).getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + auth);

        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(url, HttpMethod.POST,
                new HttpEntity<>(headers), String.class);
    }

}