package sg.edu.nus.iss.app.Backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.app.Backend.models.TarotResult;
import sg.edu.nus.iss.app.Backend.repositories.TarotRepository;

@Service
public class TarotService {

    @Autowired
    TarotRepository tarotRepository;

    public List<TarotResult> retrieveTarotResult(String pastSelected, String presentSelected, String futureSelected) {

        List<TarotResult> resultList = new ArrayList<>();

        resultList.add(tarotRepository.retrieveTarotResult(pastSelected));
        resultList.add(tarotRepository.retrieveTarotResult(presentSelected));
        resultList.add(tarotRepository.retrieveTarotResult(futureSelected));

        return resultList;
    }

}
