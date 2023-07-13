import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CARDS } from 'src/app/util/constant';
import { CardData, LeaderboardData } from 'src/app/util/model';
import { GameDialogComponent } from './game-dialog.component';
import { GameService } from 'src/app/game.service';
import { Observable, firstValueFrom, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { GameState } from 'src/app/store/game.reducer';
import {
  setupCards,
  startTimer,
  stopTimer,
  updateMatchOrDefault,
  updateMatchedCount,
  updateToFlipped,
} from 'src/app/store/game.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  cards = CARDS; //referring to cardImages

  @Input() data!: CardData;

  cardsData$: Observable<CardData[]>;
  timer$: Observable<number>;
  isTimerRunning$: Observable<boolean>;
  flippedCards$: Observable<CardData[]>;
  matchedCount$: Observable<number>;
  totalPairs$: Observable<number>;
  // leaderboardData$: Observable<LeaderboardData[]>;

  flippedCards: CardData[] = [];
  cardsData: CardData[] = [];
  matchedCount: number = 0;
  totalPairs: number = 5; //default level: 5 pairs
  timer: number = 0;
  isTimerRunning: boolean = false;
  timerInterval: any;
  selectedDifficulty: string = 'easy';
  leaderboardData: LeaderboardData[] = [];

  // dialog = inject(MatDialog);
  // gameSvc = inject(GameService)

  constructor(
    private store: Store<{ game: GameState }>,
    private dialog: MatDialog,
    private gameSvc: GameService
  ) {
    this.cardsData$ = this.store.pipe(select((state) => state.game.cardsData));
    this.timer$ = this.store.pipe(select((state) => state.game.timer));
    this.isTimerRunning$ = this.store.pipe(
      select((state) => state.game.isTimerRunning)
    );
    this.flippedCards$ = this.store.pipe(
      select((state) => state.game.flippedCards)
    );
    this.matchedCount$ = this.store.pipe(
      select((state) => state.game.matchedCount)
    );
    this.totalPairs$ = this.store.pipe(
      select((state) => state.game.totalPairs)
    );

    // this.leaderboardData$ = this.store.select((state) => state.game.leaderboardData);
  }

  ngOnInit(): void {
    this.setupCards(5); //default level: 5 pairs , to update for easier test
  }

  setupCards(pairCount: number): void {
    this.store.dispatch(setupCards({ pairCount }));
  }

  cardClicked(index: number): void {
    this.isTimerRunning$.subscribe((isTimerRunning) => {
      if (!isTimerRunning) {
        this.store.dispatch(startTimer());
      }
    });

    this.cardsData$.subscribe((cardDataArray: CardData[]) => {
      const cardInfo = cardDataArray[index];

      this.flippedCards$.subscribe((flippedCards) => {
        if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
          this.store.dispatch(updateToFlipped({ index }));

          if (flippedCards.length > 1) {
            setTimeout(() => {
              const cardOne = flippedCards[0];
              const cardTwo = flippedCards[1];
              const nextState =
                cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
              this.store.dispatch(updateMatchOrDefault({ nextState }));

              this.matchedCount$.subscribe((matchedCount) => {
                if (nextState === 'matched') {
                  this.store.dispatch(updateMatchedCount());

                  this.totalPairs$.subscribe((totalPairs) => {
                    if (matchedCount === totalPairs) {
                      this.store.dispatch(stopTimer())

                      const dialogRef = this.dialog.open(GameDialogComponent, {
                        disableClose: true,
                        // data: {
                        //   timer: this.timer$.toFixed(2),
                        //   difficulty: this.selectedDifficulty,
                        // }, retrieve from store directly through gamedialogcomponent
                      });

                      dialogRef.afterClosed().subscribe(() => {
                        this.restart();
                      });
                    }
                  });
                }
              });
            }, 1000);
          }
        } else {
          // dispatch update to default
          cardInfo.state = 'default';
          this.flippedCards.pop();
        }
      });
    });
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

    this.gameSvc
      .loadLeaderboard(difficulty)
      .subscribe((data: LeaderboardData[]) => {
        this.leaderboardData = data;
      });
  }
}
