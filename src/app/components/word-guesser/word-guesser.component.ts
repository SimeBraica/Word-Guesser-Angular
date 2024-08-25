import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WordToGuess } from '../../models/word-to-guess';

@Component({
  selector: 'app-word-guesser',
  templateUrl: './word-guesser.component.html',
  styleUrl: './word-guesser.component.scss',
})
export class WordGuesserComponent implements OnInit {

  constructor(/* private cdref: ChangeDetectorRef */) {}

  ngOnInit() {
    //this.cdref.detectChanges();
  }

  allWordsQueue: WordToGuess[] = [
    { title: 'dog', timeOnScreen: 12, isCorrect: false },
    { title: 'cat', timeOnScreen: 12, isCorrect: false },
    { title: 'mouse', timeOnScreen: 12, isCorrect: false },
    { title: 'street', timeOnScreen: 12, isCorrect: false },
    { title: 'house', timeOnScreen: 12, isCorrect: false },
    { title: 'hamburger', timeOnScreen: 12, isCorrect: false },
    { title: 'PC', timeOnScreen: 12, isCorrect: false },
    { title: 'New York', timeOnScreen: 12, isCorrect: false }
  ];

  allWords: number = this.allWordsQueue.length;
  guessedWords: number = 0;

  allInputWords: string[] = [];
  sendInputWord: string = '';
  inputWord: string = '';

  allWrongWords: string[] = [];
  allGuessedWords: string[] = [];

  setWord() {
    this.removeDuplicatesFromInputs();
    console.log("sve rici u arr: " + this.allInputWords);
    if (this.inputWord == '') {
      return;
    }
    console.log("ric na nultom mistu: " + this.allInputWords[0]);
    this.sendInputWord = this.allInputWords[0];
    //this.allInputWords.shift();
    this.inputWord = '';
    console.log("sve pogodene rici " + this.allGuessedWords)
    console.log("sve promasene  rici " + this.allWrongWords)
  }

  guessedWord(event: string) {
    this.allGuessedWords.push(event);
    this.allInputWords.shift();
    this.guessedWords++;
  }

  wrongWord(event: string){
    this.allWrongWords.push(event);
    this.allInputWords.shift();
  }

  formatWord(word: string): string {
    return word.split(' ').join('').toLowerCase();
  }

  removeDuplicatesFromInputs() {
    this.allInputWords.push(this.formatWord(this.inputWord));
    this.allInputWords = this.allInputWords.filter(
      (value, index, array) => array.indexOf(value) === index
    );
  }
}
