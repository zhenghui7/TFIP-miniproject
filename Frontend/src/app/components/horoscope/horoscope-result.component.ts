import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HoroscopeService } from 'src/app/horoscope.service';
import { ErrorResponse, HoroscopeResult, TarotResult } from 'src/app/util/model';

@Component({
  selector: 'app-horoscope-result',
  templateUrl: './horoscope-result.component.html',
  styleUrls: ['./horoscope-result.component.css']
})
export class HoroscopeResultComponent implements OnInit {

  @Input()
  sign!: string;

  horoscopeSvc = inject(HoroscopeService)

  getReading$!: Observable<ErrorResponse | HoroscopeResult>
  errorResponse: ErrorResponse | null = null
  horoscopeResult!: HoroscopeResult;

  ngOnInit(): void {
    this.getReading$ = this.horoscopeSvc.getHoroscope(this.sign)
    this.getReading$.subscribe(
      (result: ErrorResponse | HoroscopeResult) => {
        if (this.isErrorResponse(result)) {
          this.errorResponse = result;
        } else {
          this.horoscopeResult = result;
          this.horoscopeResultStyling();
        }
      },
      (error: any) => {
        console.error('An error occurred:', error);
        this.errorResponse = { Error: error.error?.Error };
      }
    );
  }

  isErrorResponse(result: ErrorResponse | HoroscopeResult): result is ErrorResponse {
    return 'Error' in result;
  }
  
  horoscopeResultStyling(): void {
    this.horoscopeResult.today = this.transformText(this.horoscopeResult.today);
    this.horoscopeResult.tomorrow = this.transformText(this.horoscopeResult.tomorrow);
    this.horoscopeResult.monthly = this.transformMonthlyText(this.horoscopeResult.monthly);
  }


transformText(text: string): string {
  text = text.replace('DailyHoroscope', '').trim();
  text = text.replace(/\[(.*?)\]/g, '$1');
  text = text.replace(/(personalLife=)/g, 'Personal Life: \n');
  text = text.replace(/(profession=)/g, '\n\nProfession: \n');
  text = text.replace(/(health=)/g, '\n\nHealth: \n');
  text = text.replace(/(travel=)/g, '\n\nTravel: \n');
  text = text.replace(/(luck=)/g, '\n\nLuck: \n');
  text = text.replace(/(emotions=)/g, '\n\nEmotions: \n');
  return text;
}

underlineLabels(text: string): string {
  return text.replace(/(Personal Life|Profession|Health|Travel|Luck|Emotions|Prediction):/g, '<u>$1:</u>');
}

transformMonthlyText(text: string): string {
  text = text.replace('MonthlyHoroscope', '').trim();
  text = text.replace(/\[(.*?)\]/g, '$1');
  text = text.replace(/(prediction=)/g, 'Prediction: \n');
  text = text.replace(/\[(.*?)\]/g, '$1');
  return text
}

}
