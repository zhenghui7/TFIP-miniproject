import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.css']
})
export class GameDialogComponent implements OnInit {

  showInputField: boolean = false;

  data: { timer: number, difficulty: string } = inject(MAT_DIALOG_DATA)
  dialogRef = inject(MatDialogRef<GameDialogComponent>)
  gameSvc = inject(GameService)

  form!: FormGroup
  fb: FormBuilder = inject(FormBuilder)

  // leaderboard$! : Observable<LeaderboardData[]>

  ngOnInit(): void {
    this.form = this.fb.group({
      gameNameControl: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(10) ])
    })
  }

  toggleInputField(): void {

    this.showInputField = !this.showInputField;
  }

  shareToLeaderboard(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Posting to leaderboard:', this.form.value['gameNameControl'] , this.data.timer, this.data.difficulty);
    this.gameSvc.uploadLeaderboard(this.form.value['gameNameControl'] , this.data.timer, this.data.difficulty)

    // Close the dialog after performing necessary actions
    this.dialogRef.close();
  }

}
