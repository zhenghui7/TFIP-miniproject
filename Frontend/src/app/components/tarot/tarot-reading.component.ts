import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CARDS } from 'src/app/util/constant';

@Component({
  selector: 'app-tarot-reading',
  templateUrl: './tarot-reading.component.html',
  styleUrls: ['./tarot-reading.component.css'],
})
export class TarotReadingComponent implements OnInit {
  cards = CARDS;
  router = inject(Router)

  pastSelected!: string;
  presentSelected!: string;
  futureSelected!: string;

  ngOnInit(): void {
    this.shuffleCards();
  }

  shuffleCards(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  selectCard(card: string): void {
    if (!this.pastSelected) {
      this.pastSelected = card;
    } else if (!this.presentSelected && card !== this.pastSelected) {
      this.presentSelected = card;
    } else if (!this.futureSelected && card !== this.pastSelected && card !== this.presentSelected) {
      this.futureSelected = card;

      this.router.navigate(['/tarot', this.pastSelected, this.presentSelected, this.futureSelected])
    }
  }

}
