import { Store, on, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import * as GameActions from './game.actions';
import { CardData, LeaderboardData } from '../util/model';
import { CARDS } from '../util/constant';
import { MatDialog } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { GameDialogComponent } from '../components/game/game-dialog.component';
import { updateMatchOrDefault } from './game.actions';

export interface GameState {
  cardsData: CardData[];
  flippedCards: CardData[];
  matchedCount: number;
  totalPairs: number;
  timer: number;
  isTimerRunning: boolean;
  selectedDifficulty: string;
  leaderboardData: LeaderboardData[];
  // timerInterval: any;
  clickedIndex: number[];
}

export const initialState: GameState = {
  cardsData: [],
  flippedCards: [],
  matchedCount: 0,
  totalPairs: 5,
  timer: 0,
  isTimerRunning: false,
  selectedDifficulty: 'easy',
  leaderboardData: [],
  // timerInterval: 0,
  clickedIndex: [],
};

export const gameReducer = createReducer(
  initialState,
  on(GameActions.setupCards, (state, { pairCount }) => ({
    ...state,
    timer: 0,
    flippedCards: [],
    matchedCount: 0,
    totalPairs: pairCount,
    cardsData: generateCardData(pairCount),
    clickedIndex: [],
  })),

  on(GameActions.startTimer, (state) => ({
    ...state,
    isTimerRunning: true,
  })),
  on(GameActions.updateTimer, (state, { timer }) => ({
    ...state,
    timer,
  })),
  on(GameActions.stopTimer, (state) => ({
    ...state,
    isTimerRunning: false,
  })),

  immerOn(GameActions.updateToFlipped, (state, { index }) => {
    state.cardsData[index].state = 'flipped';
    state.flippedCards.push(state.cardsData[index]);
    state.clickedIndex.push(index);
  }),

  immerOn(GameActions.updateMatchOrDefault, (state, { nextState }) => {
    state.cardsData[state.clickedIndex[0]].state = nextState;
    state.cardsData[state.clickedIndex[1]].state = nextState;
    state.clickedIndex = [];
    state.flippedCards = []
  }),

  on(GameActions.updateMatchedCount, (state) => ({
    ...state,
    matchedCount: state.matchedCount + 1,
  })),

  // Add other reducer actions here
);

function generateCardData(pairCount: number): CardData[] {
  const cardsData: CardData[] = [];
  const selectedCards = shuffleArray(CARDS).slice(0, pairCount);

  selectedCards.forEach((image) => {
    const cardData: CardData = {
      imageId: image,
      state: 'default',
    };

    cardsData.push({ ...cardData });
    cardsData.push({ ...cardData });
  });

  return shuffleArray(cardsData);
}

function shuffleArray(anArray: any[]): any[] {
  return anArray
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
}
