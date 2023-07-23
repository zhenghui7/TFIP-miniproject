package sg.edu.nus.iss.app.Backend.services;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import sg.edu.nus.iss.app.Backend.models.TarotData;
import sg.edu.nus.iss.app.Backend.models.TarotResult;
import sg.edu.nus.iss.app.Backend.repositories.TarotRepository;

@Service
public class TarotService {

    public static final String TAROT_URL = "https://json.astrologyapi.com/v1/tarot_predictions";

    @Value("${horoscope.api.id}")
    private String horoscopeApiId;

    @Value("${horoscope.api.key}")
    private String horoscopeApiKey;

    @Autowired
    TarotRepository tarotRepository;

    public List<TarotResult> retrieveTarotResult(String pastSelected, String presentSelected, String futureSelected) {

        List<TarotResult> resultList = new ArrayList<>();

        TarotResult pastResult = (tarotRepository.retrieveTarotResult(pastSelected));
        String tarotName1 = pastResult.name().toUpperCase();
        Integer tarotLoveId = TarotData.tarotIndex.get(tarotName1);
        resultList.add(pastResult);

        TarotResult presentResult = (tarotRepository.retrieveTarotResult(presentSelected));
        String tarotName2 = presentResult.name().toUpperCase();
        Integer tarotCareerId = TarotData.tarotIndex.get(tarotName2);
        resultList.add(presentResult);

        TarotResult futureResult = (tarotRepository.retrieveTarotResult(futureSelected));
        String tarotName3 = futureResult.name().toUpperCase();
        Integer tarotFinanceId = TarotData.tarotIndex.get(tarotName3);
        resultList.add(futureResult);

        TarotResult loveCareerFinance = tarotExternalApiRequest(tarotLoveId, tarotCareerId, tarotFinanceId);
        resultList.add(loveCareerFinance);

        return resultList;
    }

    private TarotResult tarotExternalApiRequest(Integer tarotLoveId, Integer tarotCareerId, Integer tarotFinanceId) {

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("love", String.valueOf(tarotLoveId));
        formData.add("career", String.valueOf(tarotCareerId));
        formData.add("finance", String.valueOf(tarotFinanceId));

        String auth = Base64.getEncoder().encodeToString((horoscopeApiId + ":" + horoscopeApiKey).getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + auth);

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, headers);

        ResponseEntity<String> apiResponse = restTemplate.exchange(TAROT_URL, HttpMethod.POST,
                requestEntity, String.class);

        List<String> mapToListString = handleJsonString(apiResponse.getBody());

        return new TarotResult("LoveCareerFinance", mapToListString);
    }

    private List<String> handleJsonString(String json) {
        List<String> s = new ArrayList<>();

        InputStream is = new ByteArrayInputStream(json.getBytes());
        JsonReader r = Json.createReader(is);
        JsonObject o = r.readObject();

        s.add("Love: " + o.getString("love") + "]");
        s.add("[" + "Career: " + o.getString("career") + "]");
        s.add("[" + "Finance: " + o.getString("finance"));
        return s;
    }

}
