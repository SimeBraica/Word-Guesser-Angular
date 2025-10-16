import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guessed-words',
  templateUrl: './guessed-words.component.html',
  styleUrl: './guessed-words.component.scss',
})
export class GuessedWordsComponent {
  @Input()
  guessedWords: string[] = [];
}
