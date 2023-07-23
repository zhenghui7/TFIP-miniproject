import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TarotService } from 'src/app/tarot.service';
import { ErrorResponse, TarotResult } from 'src/app/util/model';

@Component({
  selector: 'app-tarot-result',
  templateUrl: './tarot-result.component.html',
  styleUrls: ['./tarot-result.component.css']
})
export class TarotResultComponent implements OnInit {
  @Input()
  pastSelected!: string;
  @Input()
  presentSelected!: string;
  @Input()
  futureSelected!: string;

  tarotSvc = inject(TarotService)
  result$!: Observable<ErrorResponse | TarotResult[]>
  errorResponse: ErrorResponse | null = null
  showAlternate: boolean = false;

  ngOnInit(): void {
      this.result$ = this.tarotSvc.retrieveData(this.pastSelected, this.presentSelected, this.futureSelected)
      this.result$.subscribe(
        (result: ErrorResponse | TarotResult[]) => {
          if (this.isErrorResponse(result)) {
            this.errorResponse = result;
          }
        },
        (error: any) => {
          console.error('An error occurred:', error);
          this.errorResponse = { Error: error.error?.Error };
        }
      );
  }

  isErrorResponse(result: ErrorResponse | TarotResult[]): result is ErrorResponse {
    return 'Error' in result;
  }

  isTarotResponseArray(result: ErrorResponse | TarotResult[]): result is TarotResult[] {
    return Array.isArray(result) && result.every(item => 'name' in item && 'fortuneTelling' in item);
  }

  formatFortuneTelling(fortuneTelling: string): string {
    fortuneTelling = fortuneTelling.replace('[', '').replace(']', '');
    const fortuneTellingArray = fortuneTelling.split(',');
    return fortuneTellingArray.map((item) => item.trim()).join('<br>');
  }

  formatDifferentFortuneTelling(fortuneTelling: string): { love: string, career: string, finance: string } {
    if (!fortuneTelling) {
      return { love: '', career: '', finance: '' };
    }

    fortuneTelling = fortuneTelling.slice(1, -1);
    const [love, career, finance] = fortuneTelling.split('], [');
    
    fortuneTelling = fortuneTelling.replace('[', '').replace(']', '');

    return {
      love: love ? love.replace('Love: ', '') : '',
      career: career ? career.replace('Career: ', '') : '',
      finance: finance ? finance.replace('Finance: ', '') : '',
    };
  }

  toggleDisplay() {
    this.showAlternate = !this.showAlternate;
  }

}
