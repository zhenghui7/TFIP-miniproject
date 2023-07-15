import { createAction, props } from '@ngrx/store';
import { CardData, LeaderboardData } from 'src/app/util/model';

export const setupCards = createAction('[Game] Setup Cards', props<{ pairCount: number }>());

export const startTimer = createAction( '[Game] Start Timer');

export const stopTimer = createAction( '[Game] Stop Timer');

export const updateTimer = createAction( '[Game] Update Timer', props<{ timer: number }>());

export const updateToFlipped = createAction( '[Game] update To Flipped Card', props<{ index : number }>());

export const updateMatchOrDefault = createAction( '[Game] update Match Or Default', props<{ nextState : 'default' | 'matched' }>());

export const updateSameCardClicked = createAction( '[Game] Update Same Card Clicked', props<{ nextState : 'default' | 'matched' }>());

export const updateMatchedCount = createAction('[Game] Update Matched Count');

export const updateSelectedDifficulty = createAction('[Game Component] Update Selected Difficulty', props<{ difficulty: string }>());

export const updateLeaderboardData = createAction('[Game] Update Leaderboard Data',props<{ data: LeaderboardData[] }>());




  
