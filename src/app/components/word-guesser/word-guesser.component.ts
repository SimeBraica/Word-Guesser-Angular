import { Component } from '@angular/core';
import { WordToGuess } from '../../models/word-to-guess';

@Component({
  selector: 'app-word-guesser',
  templateUrl: './word-guesser.component.html',
  styleUrl: './word-guesser.component.scss',
})
export class WordGuesserComponent {
  allWordsQueue: WordToGuess[] = [
    { title: 'ad', timeOnScreen: 12, isCorrect: false },
    { title: 'fwefwe', timeOnScreen: 12, isCorrect: false },
    { title: 'dsagerje', timeOnScreen: 12, isCorrect: false },
    { title: 'jztjdfgjf', timeOnScreen: 12, isCorrect: false },
    { title: 'ewtzwruzsfh', timeOnScreen: 12, isCorrect: false },
    { title: 'htehrsdgh', timeOnScreen: 12, isCorrect: false },
  ];
  allInputWords: string[] = [];
  sendInputWord: string = "";
  inputWord: string = "";

  consoleLogInputWord() {
    if(this.inputWord == ""){
      return;
    }
    this.allInputWords.push(this.inputWord);
    console.log(this.allInputWords);
    this.sendInputWord = this.inputWord;
    this.inputWord = '';
  }
}
