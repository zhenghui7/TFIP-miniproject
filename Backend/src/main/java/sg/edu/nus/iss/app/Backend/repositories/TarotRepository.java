package sg.edu.nus.iss.app.Backend.repositories;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.app.Backend.models.TarotResult;

@Repository
public class TarotRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    public TarotResult retrieveTarotResult(String card) {

        Query query = new Query(Criteria.where("img").is(card));

        return mongoTemplate.find(query, Document.class, "cards")
                .stream()
                .findFirst()
                .map(doc -> new TarotResult(doc.getString("name"), doc.getList("fortune_telling", String.class)))
                .orElse(null);
    }

}
