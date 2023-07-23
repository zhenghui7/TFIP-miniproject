import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CARDS } from 'src/app/util/constant';
import { CardData, LeaderboardData } from 'src/app/util/model';
import { GameDialogComponent } from './game-dialog.component';
import { GameService } from 'src/app/game.service';
import { Observable, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { GameState } from 'src/app/store/game.reducer';
import {
  setupCards, startTimer, stopTimer, updateLeaderboardData,
  updateMatchOrDefault, updateMatchedCount, updateSelectedDifficulty, updateToFlipped
} from 'src/app/store/game.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  cards = CARDS; 

  cardsData$: Observable<CardData[]>;
  timer$: Observable<number>;
  isTimerRunning$: Observable<boolean>;
  flippedCards$: Observable<CardData[]>;
  matchedCount$: Observable<number>;
  totalPairs$: Observable<number>;
  selectedDifficulty$: Observable<string>; 
  leaderboardData$: Observable<LeaderboardData[]>;

  constructor(
    private store: Store<{ game: GameState }>,
    private dialog: MatDialog,
    private gameSvc: GameService
  ) {
    this.cardsData$ = this.store.pipe(select((state) => state.game.cardsData));
    this.timer$ = this.store.pipe(select((state) => state.game.timer));
    this.isTimerRunning$ = this.store.pipe(select((state) => state.game.isTimerRunning));
    this.flippedCards$ = this.store.pipe(select((state) => state.game.flippedCards));
    this.matchedCount$ = this.store.pipe(select((state) => state.game.matchedCount));
    this.totalPairs$ = this.store.pipe(select((state) => state.game.totalPairs));
    this.selectedDifficulty$ = this.store.pipe(select((state) => state.game.selectedDifficulty));
    this.leaderboardData$ = this.store.pipe(select((state) => state.game.leaderboardData));
  }

  ngOnInit(): void {
    this.setupCards(5);
  }

  setupCards(pairCount: number): void {
    this.store.dispatch(setupCards({ pairCount }));
  }

  cardClicked(index: number): void {
    this.isTimerRunning$.pipe(take(1)).subscribe((isTimerRunning) => {
      if (!isTimerRunning) {
        this.store.dispatch(startTimer());
      }
    });
  
    this.cardsData$.pipe(take(1)).subscribe((cardDataArray: CardData[]) => {
      const cardInfo = cardDataArray[index];
  
      this.flippedCards$.pipe(take(1)).subscribe((flippedCards) => {
        if (cardInfo.state === 'default' && flippedCards.length < 2) {
          this.store.dispatch(updateToFlipped({ index }));
  
          if (flippedCards.length === 1) {
            setTimeout(() => {
              this.cardsData$.pipe(take(1)).subscribe((updatedCardDataArray: CardData[]) => {
                const updatedCardOne = updatedCardDataArray.find((card) => card.state === 'flipped');
                const updatedCardTwo = updatedCardDataArray.find((card) => card.state === 'flipped' && card !== updatedCardOne);

                if (updatedCardOne && updatedCardTwo) {
                  const nextState = updatedCardOne.imageId === updatedCardTwo.imageId ? 'matched' : 'default';
                  this.store.dispatch(updateMatchOrDefault({ nextState }));

                  this.matchedCount$.pipe(take(1)).subscribe((matchedCount) => {
                    if (nextState === 'matched') {
                      this.store.dispatch(updateMatchedCount());
  
                      this.totalPairs$.pipe(take(1)).subscribe((totalPairs) => {

                        if (matchedCount === totalPairs) {
                          this.store.dispatch(stopTimer());
  
                          this.timer$.pipe(take(1)).subscribe((timer) => {
                            this.selectedDifficulty$.pipe(take(1)).subscribe((selectedDifficulty) => {
                              const dialogRef = this.dialog.open(GameDialogComponent, {
                                disableClose: true,
                                data: {
                                  timer: timer.toFixed(2),
                                  difficulty: selectedDifficulty,
                                },
                              });
  
                              dialogRef.afterClosed().subscribe(() => {
                                this.selectDifficulty(selectedDifficulty);
                              });
                            });
                          });
                        }
                      });
                    }
                  });
                } 
              });
            }, 1000);
          }
        } 
      });
    });
  }

  selectDifficulty(difficulty: string): void {
    this.store.dispatch(updateSelectedDifficulty({ difficulty }));

    this.selectedDifficulty$.pipe(take(1)).subscribe((difficulty) => {
      let pairCount = 0;

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

      this.store.dispatch(setupCards({ pairCount }));

      this.gameSvc
        .loadLeaderboard(difficulty)
        .subscribe((data: LeaderboardData[]) => {
          this.store.dispatch(updateLeaderboardData({ data }));
        });
    });
  }
}
