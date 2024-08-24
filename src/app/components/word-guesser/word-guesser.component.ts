import { Component } from '@angular/core';
import { WordToGuess } from '../../models/word-to-guess';

@Component({
  selector: 'app-word-guesser',
  templateUrl: './word-guesser.component.html',
  styleUrl: './word-guesser.component.scss',
})
export class WordGuesserComponent {
  allWordsQueue: WordToGuess[] = [
    { title: 'dog', timeOnScreen: 12, isCorrect: false },
    { title: 'cat', timeOnScreen: 12, isCorrect: false },
    { title: 'mouse', timeOnScreen: 12, isCorrect: false },
    { title: 'street', timeOnScreen: 12, isCorrect: false },
    { title: 'house', timeOnScreen: 12, isCorrect: false },
    { title: 'hamburger', timeOnScreen: 12, isCorrect: false },
    { title: 'PC', timeOnScreen: 12, isCorrect: false },
    { title: 'New York', timeOnScreen: 12, isCorrect: false },
  ];
  
  allInputWords: string[] = [];
  sendInputWord: string = '';
  inputWord: string = '';

  consoleLogInputWord() {
    if (this.inputWord == '') {
      return;
    }
    this.allInputWords.push(this.inputWord);
    console.log(this.allInputWords);
    this.sendInputWord = this.inputWord;
    this.inputWord = '';
  }
}
