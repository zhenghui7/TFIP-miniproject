import {Component,Input, OnInit, inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CARDS } from 'src/app/util/constant';
import { CardData, LeaderboardData } from 'src/app/util/model';
import { GameDialogComponent } from './game-dialog.component';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  cards = CARDS; //referring to cardImages

  @Input() data!: CardData;

  cardsData: CardData[] = []; //referring to cards
  flippedCards: CardData[] = [];
  matchedCount: number = 0;
  totalPairs: number = 5; //default level: 5 pairs
  timer: number = 0;
  isTimerRunning: boolean = false;
  timerInterval: any;
  selectedDifficulty: string = 'easy';
  leaderboardData: LeaderboardData[] = [];

  dialog = inject(MatDialog);
  gameSvc = inject(GameService)

  ngOnInit(): void {
    this.setupCards(5); //default level: 5 pairs , to update for easier test
  }

  setupCards(pairCount: number): void {
    this.timer = 0;
    this.cardsData = [];
    const selectedCards = this.shuffleArray(this.cards).slice(0, pairCount); 

    selectedCards.forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        state: 'default',
      };

      this.cardsData.push({ ...cardData });
      this.cardsData.push({ ...cardData });
    });

    this.cardsData = this.shuffleArray(this.cardsData);
  }

  shuffleArray(anArray: any[]): any[] {
    return anArray
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cardsData[index];

    if (!this.isTimerRunning) {
      this.startTimer();
    }

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.totalPairs) {    //  to update for easier test: if (this.matchedCount === 1)
          clearInterval(this.timerInterval);
          this.isTimerRunning = false;
          
          const dialogRef = this.dialog.open(GameDialogComponent, {
            disableClose: true,
            data: {
              timer: this.timer.toFixed(2),
              difficulty: this.selectedDifficulty
            }
          });

          dialogRef.afterClosed().subscribe(() => {
            this.restart();
          });
        }
      }

    }, 1000);
  }

  restart(): void {
    this.matchedCount = 0;
    this.setupCards(this.totalPairs);
    if (this.isTimerRunning) {
      clearInterval(this.timerInterval);
      this.timer = 0;
      this.isTimerRunning = false;
    }
  }

  startTimer(): void {
    if (!this.isTimerRunning) {
      this.isTimerRunning = true;
      this.timerInterval = setInterval(() => {
        this.timer += 0.01;
      }, 10);
    }
  }

  selectDifficulty(difficulty: string): void {
    this.selectedDifficulty = difficulty;
    let pairCount = 0;
    // to add the gameSvc to load the leaderboard for default and clicked on the difficulty button

    if (this.isTimerRunning) {
      clearInterval(this.timerInterval);
      this.timer = 0;
      this.isTimerRunning = false;
    }
  
    if (this.isTimerRunning) {
      clearInterval(this.timerInterval);
      this.timer = 0;
      this.isTimerRunning = false;
    }

    // Set the number of pairs based on the difficulty level
    switch (difficulty) {
      case 'easy':
        pairCount = 5;
        break;
      case 'medium':
        pairCount = 10;
        break;
      case 'hard':
        pairCount = 20;
        break;
      case 'extreme':
        pairCount = this.cards.length;
        break;
      default:
        pairCount = 5;
        break;
    }

    this.totalPairs = pairCount;
    this.setupCards(pairCount);

    this.gameSvc.loadLeaderboard(difficulty).subscribe((data: LeaderboardData[]) => {
      this.leaderboardData = data;
    });
  }
  
}
