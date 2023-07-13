import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from './game.reducer';

export const selectGameState = createFeatureSelector<GameState>('game');

  

// export const selectCardsData = createSelector(
//   selectGameState,
//   (state) => state.cardsData
// );

// export const selectFlippedCards = createSelector(
//   selectGameState,
//   (state) => state.flippedCards
// );

// export const selectMatchedCount = createSelector(
//   selectGameState,
//   (state) => state.matchedCount
// );

// export const selectTotalPairs = createSelector(
//   selectGameState,
//   (state) => state.totalPairs
// );

// export const selectTimer = createSelector(
//   selectGameState,
//   (state) => state.timer
// );

// export const selectIsTimerRunning = createSelector(
//   selectGameState,
//   (state) => state.isTimerRunning
// );

// export const selectSelectedDifficulty = createSelector(
//   selectGameState,
//   (state) => state.selectedDifficulty
// );

// export const selectLeaderboardData = createSelector(
//   selectGameState,
//   (state) => state.leaderboardData
// );
