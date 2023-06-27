import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/game.service';
import { LeaderboardData } from 'src/app/util/model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  
  @Input() leaderboardData: LeaderboardData[] = [];
  // leaderboardData: LeaderboardData[] = [];
  allBundles$!: Observable<LeaderboardData[]>;

  gameSvc = inject(GameService);
  defaultDifficulty: string = 'easy';

  ngOnInit(): void {
    this.allBundles$ = this.gameSvc.loadLeaderboard(this.defaultDifficulty);
    this.allBundles$.subscribe((data: LeaderboardData[]) => {
      this.leaderboardData = data;
    });

    this.gameSvc.leaderboardData$.subscribe((data: LeaderboardData[]) => {
      this.leaderboardData = data;
    });
  }
}
