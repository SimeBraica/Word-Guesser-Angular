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
  wordToGuess!: WordToGuess;
  @Input()
  inputWord!: string;
  @Output()
  guessedWordEmmiter = new EventEmitter<string>();
  @Output()
  wrongWordEmmiter = new EventEmitter<string>();
  ngOnInit() {}

  ngOnChanges() {
    if (this.inputWord != '') {
      this.checkWordInAllWords(this.inputWord);
    }
  }

  checkWordInAllWords(word: string) {
    if (this.formatWord(this.wordToGuess.title) != this.formatWord(word)) {
      //console.log("u djecijoj komponenti sam wrong word " + word );
      this.wrongWordEmmiter.emit(word);
      return;
    }
    this.wordToGuess.isCorrect = true;
    //console.log(this.wordToGuess);
    this.guessedWordEmmiter.emit(this.wordToGuess.title); 
    return;
  }
  formatWord(word: string): string {
    return word.split(' ').join('').toLowerCase();
  }

  changeBackgroundOfWord() {
    if (this.wordToGuess.isCorrect) {
      return 'display: none';
    }
    return 'background: #000000';
  }
}
