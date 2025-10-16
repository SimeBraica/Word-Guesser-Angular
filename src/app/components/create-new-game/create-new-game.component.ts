import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DifficultyObject } from '../../models/difficulty-object';
@Component({
  selector: 'app-create-new-game',
  templateUrl: './create-new-game.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styleUrl: './create-new-game.component.scss',
})
export class CreateNewGameComponent {
  constructor(private router: Router) {}

  numberOfWords!: number;
  difficulty: string = '';

  createNewDifficultyObject(
    difficulty: string,
    timeForDifficulty: number
  ): DifficultyObject {
    return {
      difficulty: difficulty,
      timeForDifficulty: timeForDifficulty,
    };
  }

  setDifficulty(difficulty: string): DifficultyObject | null {
    switch (difficulty) {
      case 'easy': {
        return this.createNewDifficultyObject(difficulty, 200);
      }
      case 'normal': {
        return this.createNewDifficultyObject(difficulty, 400);
      }
      case 'hard': {
        return this.createNewDifficultyObject(difficulty, 600);
      }
      default:
        return null;
    }
  }

  startGame() {
    if(!this.validateInputs()){
      return;
    }
    this.router.navigate(['/word-guesser'], {
      state: {
        numberOfWords: this.numberOfWords,
        difficultyObject: this.setDifficulty(this.difficulty),
      },
    });
  }

  validateInputs() : boolean{
    if(typeof Number(this.numberOfWords) != typeof 0){
      return false
    }
    if(this.difficulty == ""){
      return false
    }
    return true;
  }
}
