import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { URLSTRING } from './util/constant';
import { Observable } from 'rxjs';
import { ErrorResponse, HoroscopeResult } from './util/model';

@Injectable()
export class HoroscopeService {
    
  http = inject(HttpClient);
  url = URLSTRING;

  getHoroscope( sign: string ) : Observable<ErrorResponse | HoroscopeResult> {
    console.info('>>>> before http request:', sign);

    return this.http.get<ErrorResponse | HoroscopeResult >(`${this.url}/horoscope/${sign}`)
  }
  
}
