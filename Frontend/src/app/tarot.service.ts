import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ErrorResponse, TarotResult } from "./util/model";
import { Observable } from "rxjs";
import { URLSTRING } from "./util/constant";

@Injectable()
export class TarotService {

  http = inject(HttpClient)
  url = URLSTRING

  retrieveData(pastSelected: string, presentSelected: string, futureSelected: string): Observable<ErrorResponse | TarotResult[]> {

    return this.http.get<ErrorResponse | TarotResult[]>(`${this.url}/tarot/${pastSelected}/${presentSelected}/${futureSelected}`)
  }
    
}
