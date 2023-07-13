import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './util/material.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

import { ContactMeComponent } from './components/contact-me.component';
import { HoroscopeComponent } from './components/horoscope.component'
import { TarotService } from './tarot.service';
import { GameComponent } from './components/game/game.component';
import { TarotReadingComponent } from './components/tarot/tarot-reading.component';
import { TarotResultComponent } from './components/tarot/tarot-result.component';
import { GameSetupComponent } from './components/game/game-setup.component';
import { GameDialogComponent } from './components/game/game-dialog.component';
import { LeaderboardComponent } from './components/game/leaderboard.component';
import { GameService } from './game.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GameEffects } from './store/game.effects';
import { gameReducer } from './store/game.reducer';


const appRoutes: Routes = [
  { path: '', component: GameComponent, title: 'Matching Game' },
  { path: "tarot", component: TarotReadingComponent, title: 'Tarot Reading'}, 
  { path: 'tarot/:pastSelected/:presentSelected/:futureSelected', component: TarotResultComponent, title: 'Tarot Result'},
  { path: "horoscope", component: HoroscopeComponent, title: 'Horoscope Reading' },
  { path: "contact", component: ContactMeComponent, title: 'Contact' },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    TarotReadingComponent,
    ContactMeComponent,
    HoroscopeComponent,
    TarotResultComponent,
    GameSetupComponent,
    GameDialogComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
    MaterialModule, HttpClientModule, RouterModule.forRoot(appRoutes , { useHash: true, bindToComponentInputs: true } ), 
    StoreModule.forRoot({ game: gameReducer }), EffectsModule.forRoot([GameEffects]),
  ],
  providers: [TarotService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
