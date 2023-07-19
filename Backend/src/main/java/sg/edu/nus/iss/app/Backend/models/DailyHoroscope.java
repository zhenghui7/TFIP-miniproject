package sg.edu.nus.iss.app.Backend.models;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


public class DailyHoroscope {

    private String personalLife;
    private String profession;
    private String health;
    private String travel;
    private String luck;
    private String emotions;
 
    public String getPersonalLife() {
        return personalLife;
    }

    public void setPersonalLife(String personalLife) {
        this.personalLife = personalLife;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getHealth() {
        return health;
    }

    public void setHealth(String health) {
        this.health = health;
    }

    public String getTravel() {
        return travel;
    }

    public void setTravel(String travel) {
        this.travel = travel;
    }

    public String getLuck() {
        return luck;
    }

    public void setLuck(String luck) {
        this.luck = luck;
    }

    public String getEmotions() {
        return emotions;
    }

    public void setEmotions(String emotions) {
        this.emotions = emotions;
    }

    @Override
    public String toString() {
        return "DailyHoroscope [personalLife=" + personalLife + ", profession=" + profession + ", health=" + health
                + ", travel=" + travel + ", luck=" + luck + ", emotions=" + emotions + "]";
    }

    public static DailyHoroscope create(String json) throws IOException {

        JsonNode productNode = new ObjectMapper().readTree(json);
        DailyHoroscope d = new DailyHoroscope();
        d.setEmotions(productNode.get("prediction").get("emotions").textValue());
        d.setHealth(productNode.get("prediction").get("health").textValue());
        d.setLuck(productNode.get("prediction").get("luck").textValue());
        d.setPersonalLife(productNode.get("prediction").get("personal_life").textValue());
        d.setProfession(productNode.get("prediction").get("profession").textValue());
        d.setTravel(productNode.get("prediction").get("travel").textValue());
        return d;
    }

}
