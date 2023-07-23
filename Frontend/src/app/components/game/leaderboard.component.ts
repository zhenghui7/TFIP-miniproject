import { Component, Input, OnInit, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { GameService } from 'src/app/game.service';
import { GameState } from 'src/app/store/game.reducer';
import { LeaderboardData } from 'src/app/util/model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  @Input() leaderboardData: LeaderboardData[] = [];
  allBundles$!: Observable<LeaderboardData[]>;
  selectedDifficulty$: Observable<string>;

  gameSvc = inject(GameService);
  constructor(private store: Store<{ game: GameState }>) {
    this.selectedDifficulty$ = this.store.pipe(select((state) => state.game.selectedDifficulty));
  }

  ngOnInit(): void {
    this.selectedDifficulty$.pipe(take(1)).subscribe((difficulty) => {
      this.allBundles$ = this.gameSvc.loadLeaderboard(difficulty);
      this.allBundles$.subscribe((data: LeaderboardData[]) => {
        this.leaderboardData = data;
      });
    });

    this.gameSvc.leaderboardData$.subscribe((data: LeaderboardData[]) => {
      this.leaderboardData = data;
    });
  }
}
