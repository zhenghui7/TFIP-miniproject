import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { URLSTRING } from "./util/constant";
import { LeaderboardData } from "./util/model";
import { Observable, Subject, catchError, map, of } from "rxjs";

@Injectable()
export class GameService {

    http = inject(HttpClient)
    url = URLSTRING

    leaderboardDataSubject = new Subject <LeaderboardData[]>
    leaderboardData$ = this.leaderboardDataSubject.asObservable()

    uploadLeaderboard(name: string, timer: number, difficulty: string): void {
        
        const form = new HttpParams() 
        .set("name", name)
        .set("timer", timer)
        .set("difficulty", difficulty)

        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")

        this.http.post<LeaderboardData[]>( `${this.url}/game`, form.toString(), { headers } )
            .subscribe(
                (leaderboardData: LeaderboardData[]) => {
                    this.leaderboardDataSubject.next(leaderboardData);
                }
            )
    }

    loadLeaderboard(selectedtDifficulty: string): Observable<LeaderboardData[]> {
        return this.http.get<LeaderboardData[]>(`${this.url}/game/${selectedtDifficulty}`).pipe(
            map((response: any) => {
              if (response && response.hasOwnProperty('Empty')) {
                return [];
              } else {
                return response as LeaderboardData[];
              }
            }),
            catchError(() => {
              return of([] as LeaderboardData[]);
            })
        )
    }

}