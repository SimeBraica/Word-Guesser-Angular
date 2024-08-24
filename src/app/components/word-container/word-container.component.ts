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
    console.log("ja san prije nego sto udem");
    this.checkWordInAllWords(this.inputWord);
    console.log("ovo je nakon sta izaden");
    console.log(
      'Ja sam u djecijoj komponenti ' + this.inputWord + ' ric je uredu'
    );
  }

  checkWordInAllWords(word: string){
    if(this.wordToGuess.title == word){
      this.wordToGuess.isCorrect = true;
      console.log(this.wordToGuess);
    }
  }
}
