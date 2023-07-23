package sg.edu.nus.iss.app.Backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.app.Backend.models.Board;
import sg.edu.nus.iss.app.Backend.repositories.GameRepository;

@Service
public class GameService {
    
    @Autowired
    GameRepository gameRepository;

    public List<Board> uploadAndRetrieve(String name, float timer, String difficulty) {
        
        gameRepository.upload(name, timer, difficulty);

        List<Board> leaderboard = gameRepository.retrieve(difficulty);

        return leaderboard;
    }

    public List<Board> retrieveLeaderboard(String difficulty) {
        return gameRepository.retrieve(difficulty);
    }

    
    
}
