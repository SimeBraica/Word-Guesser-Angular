import {
  Component,
  Input,
  OnChanges,
  OnInit,
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

  ngOnInit() {}

  ngOnChanges() {
    this.checkWordInAllWords(this.inputWord);
    console.log(
      'Ja sam u djecijoj komponenti ' + this.inputWord + ' ric je uredu'
    );
  }

  checkWordInAllWords(word: string) {
    if (this.formatWord(this.wordToGuess.title) != this.formatWord(word)) {
      return;
    }
    this.wordToGuess.isCorrect = true;
    console.log(this.wordToGuess);
  }

  formatWord(word: string): string{
    return word.split(" ").join("").toLocaleLowerCase();
  }

  changeBackgroundOfWord(){
    if(this.wordToGuess.isCorrect){
      return 'background: #DC143C'
    }
    return 'background: #000000'
  }
}
