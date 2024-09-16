import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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


  moveIndex: number = 0;
  titlesWordsToGuess: string[] = [];
  ngOnInit() {
    this.wordsToGuess.forEach((word) => {
      this.titlesWordsToGuess.push(this.formatWord(word.title));
    });
    setInterval(() => {
      this.moveWords(0);
    }, 1);
  }

  ngOnChanges() {
    if (this.inputWord == '') {
      return;
    }
    this.checkWordInAllWords(this.inputWord);
  }

  checkWordInAllWords(word: string) {
    word = this.formatWord(word);
    if (!this.titlesWordsToGuess.includes(word)) {
      console.log('u djecijoj komponenti sam wrong word ' + word);
      this.wrongWordEmmiter.emit(word);
      return;
    }
    console.log('dobar sam');

    this.guessedWordEmmiter.emit(word);
    return;
  }

  moveWords(index: number): object {
    let marginLeft = this.wordsToGuess[index].timeOnScreen;
    console.log('objekt na mistu ', index, 'ima vrijednost ', marginLeft);
     this.moveIndex += marginLeft/100 * marginLeft;
    return {
      'margin-left': `${this.moveIndex}px`,
    };
  }

  formatWord(word: string): string {
    return word.split(' ').join('').toLowerCase();
  }
}
