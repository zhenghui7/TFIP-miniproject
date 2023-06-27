export interface TarotResult {
  name: string;
  fortuneTelling: string;
}

export interface ErrorResponse {
  Error: string;
}

export interface CardData {
  imageId: string;
  state: 'default' | 'flipped' | 'matched';
}

export interface LeaderboardData {
  name: string;
  timer: number;
}
