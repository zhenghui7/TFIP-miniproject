import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardData } from 'src/app/util/model';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none',
      })),
      state('flipped', style({
        transform: 'perspective(600px) rotateY(180deg)'
      })),
      state('matched', style({
        visibility: 'false',
        transform: 'scale(0.05)',
        opacity: 0
      })),
      transition('default => flipped', [
        animate('200ms')
      ]),
      transition('flipped => default', [
        animate('200ms')
      ]),
      transition('* => matched', [
        animate('200ms')
      ])
    ])
  ]
})
export class GameSetupComponent implements OnInit {

  @Input() cardsData!: CardData;

  @Output() cardClicked = new EventEmitter();

  // constructor() { }

  ngOnInit(): void {
  }
  
}
