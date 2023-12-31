import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { interval } from 'rxjs';
import {
  map, switchMap, takeUntil
} from 'rxjs/operators';
import * as GameActions from './game.actions';

@Injectable()
export class GameEffects {
  constructor(private actions$: Actions) {}

  startTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.startTimer),
      switchMap(() =>
        interval(10).pipe(
          map((value) => (value + 1) * 0.01), // Calculate the new timer value
          map((timer) => GameActions.updateTimer({ timer })),
          takeUntil(this.actions$.pipe(ofType(GameActions.stopTimer)))
        )
      )
    )
  );

  selectDifficulty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.updateSelectedDifficulty),
      map(() => GameActions.stopTimer())
    )
  );
  
}
