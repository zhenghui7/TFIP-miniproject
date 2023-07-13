import { createAction, props } from '@ngrx/store';
import { CardData, LeaderboardData } from 'src/app/util/model';

export const setupCards = createAction('[Game] Setup Cards', props<{ pairCount: number }>());

// export const cardClicked = createAction( '[Game] Card Clicked', props<{ index: number }>());

export const startTimer = createAction( '[Game] Start Timer');

export const stopTimer = createAction( '[Game] Stop Timer');

export const updateTimer = createAction( '[Game] Update Timer', props<{ timer: number }>());

export const updateToFlipped = createAction( '[Game] update To Flipped Card', props<{ index : number }>());

export const updateMatchOrDefault = createAction( '[Game] update Match Or Default', props<{ nextState : 'default' | 'matched' }>());

export const updateMatchedCount = createAction('[Game] Update Matched Count');

// export const checkCardMatch = createAction( '[Game] Check Card Match' );


// export const updateLeaderboardData = createAction(
//   '[Game] Update Leaderboard Data',
//   props<{ leaderboardData: LeaderboardData[] }>()
// );


// export const loadLeaderboard = createAction(
//   '[Game Component] Load Leaderboard',
//   props<{ difficulty: string }>()
// );

// export const loadLeaderboardSuccess = createAction(
//   '[Game Effect] Load Leaderboard Success',
//   props<{ leaderboardData: LeaderboardData[] }>()
// );


// export const restart = createAction('[Game Component] Restart');

// export const loadCardsData = createAction(
//   '[Game Component] Load Cards Data',
//   props<{ pairCount: number }>()
// );

// export const updateSelectedDifficulty = createAction(
//     '[Game Component] Update Selected Difficulty',
//     props<{ difficulty: string }>()
//   );
  
