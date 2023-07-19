import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ZODIAC } from 'src/app/util/constant';

@Component({
  selector: 'app-horoscope',
  templateUrl: './horoscope.component.html',
  styleUrls: ['./horoscope.component.css']
})
export class HoroscopeComponent {

  zodiacSigns = ZODIAC
  router = inject(Router)

  onImageClick(sign: string) {
    this.router.navigate(['/horoscope', sign]);
  }
  
}
