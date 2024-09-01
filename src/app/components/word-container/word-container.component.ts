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

  titlesWordsToGuess: string[] = [];
  ngOnInit() {
    this.wordsToGuess.forEach((word) => {
      this.titlesWordsToGuess.push(this.formatWord(word.title));
    });

    console.log(this.titlesWordsToGuess);
  }

  ngOnChanges() {
    console.log(this.wordsToGuess);
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
    //this.wordsToGuess.at()
    /* this.wordsToGuesss.isCorrect = true;
    console.log(this.wordToGuess); */
    this.guessedWordEmmiter.emit(word);
    return;
  }
  formatWord(word: string): string {
    return word.split(' ').join('').toLowerCase();
  }
}
