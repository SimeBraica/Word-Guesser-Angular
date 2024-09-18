import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { WordToGuess } from '../../models/word-to-guess';

@Component({
  selector: 'app-word-container',
  templateUrl: './word-container.component.html',
  styleUrl: './word-container.component.scss',
})
export class WordContainerComponent implements OnInit, OnChanges {
  @Input()
  wordsToGuess: WordToGuess[] = [];
  @Input()
  inputWord: string = '';
  @Output()
  guessedWordEmmiter = new EventEmitter<string>();
  @Output()
  wrongWordEmmiter = new EventEmitter<string>();

  allTimeOnScreen: number[] = [];
  titlesWordsToGuess: string[] = [];
  wordStyles: any[] = [];
  moveIndex: number[] = [];

  constructor() {}

  ngOnInit() {
    this.wordsToGuess.forEach((word, index) => {
      this.titlesWordsToGuess.push(this.formatWord(word.title));
      this.moveIndex[index] = 0;
      this.wordStyles[index] = { 'margin-left': '0px' };
    });
    this.takeAllTimeOnScreen();

    this.wordsToGuess.forEach((_, index) => {
      this.moveWords(index); 
    });
  }

  ngOnChanges() {
    if (this.inputWord === '') {
      return;
    }
    this.checkWordInAllWords(this.inputWord);
  }

  checkWordInAllWords(word: string) {
    word = this.formatWord(word);
    if (!this.titlesWordsToGuess.includes(word)) {
      this.wrongWordEmmiter.emit(word);
      return;
    }
    this.guessedWordEmmiter.emit(word);
  }

  takeAllTimeOnScreen() {
    this.wordsToGuess.forEach((element) => {
      this.allTimeOnScreen.push(element.timeOnScreen);
    });
  }

  moveWords(index: number): void {
    const intervalId = setInterval(() => {
      if (this.moveIndex[index] >= 1300) {
        clearInterval(intervalId); 
        return;
      }
      this.moveIndex[index] += this.allTimeOnScreen[index] / 10;

      this.wordStyles[index] = {
        'margin-left': `${this.moveIndex[index]}px`,
      };

    }, 1); 
  }

  formatWord(word: string): string {
    return word.split(' ').join('').toLowerCase();
  }
}
