import { on, createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

import * as GameActions from './game.actions';
import { CardData, LeaderboardData } from '../util/model';
import { CARDS } from '../util/constant';

export interface GameState {
  cardsData: CardData[];
  flippedCards: CardData[];
  matchedCount: number;
  totalPairs: number;
  timer: number;
  isTimerRunning: boolean;
  selectedDifficulty: string;
  leaderboardData: LeaderboardData[];
  clickedIndex: number[];
}

export const initialState: GameState = {
  cardsData: [],
  flippedCards: [],
  matchedCount: 1,
  totalPairs: 5,
  timer: 0,
  isTimerRunning: false,
  selectedDifficulty: 'easy',
  leaderboardData: [],
  clickedIndex: [],
};

export const gameReducer = createReducer(
  initialState,
  on(GameActions.setupCards, (state, { pairCount }) => ({
    ...state,
    timer: 0,
    flippedCards: [],
    matchedCount: 1,
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

  immerOn(GameActions.updateSameCardClicked, (state, { nextState }) => {
    state.cardsData[state.clickedIndex[0]].state = nextState;
    state.clickedIndex = [];
    state.flippedCards = []
  }),

  on(GameActions.updateMatchedCount, (state) => ({
    ...state,
    matchedCount: state.matchedCount + 1,
  })),
  on(GameActions.updateSelectedDifficulty, (state, { difficulty }) => ({
    ...state,
    selectedDifficulty: difficulty
  })),
  on(GameActions.updateLeaderboardData, (state, { data }) => ({
    ...state,
    leaderboardData: data
  })),

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
