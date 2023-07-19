package sg.edu.nus.iss.app.Backend.models;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class MonthlyHoroscope {

    private String prediction;

    public String getPrediction() {
        return prediction;
    }

    public void setPrediction(String prediction) {
        this.prediction = prediction;
    }

    @Override
    public String toString() {
        return "MonthlyHoroscope [prediction=" + prediction + "]";
    }

    public static MonthlyHoroscope create(String json) throws IOException {
        MonthlyHoroscope m = new MonthlyHoroscope();

        InputStream is = new ByteArrayInputStream(json.getBytes());
        JsonReader r = Json.createReader(is);
        JsonObject o = r.readObject();
        m.setPrediction(o.getJsonArray("prediction").toString());

        return m;
    }

}
