import { trigger, state, style, transition, animate } from "@angular/animations";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { GameState } from "src/app/store/game.reducer";
import { CardData } from "src/app/util/model";

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css'],
  animations: [
    trigger('cardFlip', [
      state(
        'default',
        style({
          transform: 'none',
        })
      ),
      state(
        'flipped',
        style({
          transform: 'perspective(600px) rotateY(180deg)',
        })
      ),
      state(
        'matched',
        style({
          visibility: 'hidden',
          transform: 'scale(0.05)',
          opacity: 0,
        })
      ),
      transition('default => flipped', [animate('200ms')]),
      transition('flipped => default', [animate('200ms')]),
      transition('* => matched', [animate('200ms')]),
    ]),
  ],

})
export class GameSetupComponent implements OnInit {

  @Input() index!: number;
  @Output() cardClicked = new EventEmitter();

  cardsData$!: Observable<CardData>;
  cardsData!: CardData;

  constructor(private store: Store<{ game: GameState }>) {}

  ngOnInit(): void {
    this.cardsData$ = this.store.pipe(
      select(state => state.game.cardsData[this.index])
    );
    this.cardsData$.subscribe((data: CardData) => {
      this.cardsData = data;
      console.log(">>>>>> " + this.cardsData.state)
    });
  }

}
