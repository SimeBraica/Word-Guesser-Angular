import { ChangeDetectorRef, Component, input, OnInit } from '@angular/core';
import { WordToGuess } from '../../models/word-to-guess';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-word-guesser',
  templateUrl: './word-guesser.component.html',
  styleUrl: './word-guesser.component.scss',
})
export class WordGuesserComponent implements OnInit {
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
  constructor(/* private cdref: ChangeDetectorRef */) {}

  ngOnInit() {}

  allWords: number = this.allWordsQueue.length;
  guessedWords: number = 0;

  allInputWords: string[] = [];
  sendInputWord: string = '';
  inputWord: string = '';

  allWrongWords: string[] = [];
  allGuessedWords: string[] = [];

  setWord() {
    /*     this.removeDuplicatesFromInputs();
     */ if (this.inputWord == '') {
      return;
    }
    this.sendInputWord = this.inputWord;
    this.inputWord = '';
    //this.inputWord = '';
    /*     this.sendInputWord = this.allInputWords[0];
     */ //this.allInputWords.shift();
    /*     this.inputWord = '';
     */
  }

  guessedWord(correctWord: string) {
    this.allGuessedWords.push(correctWord);
    this.deleteWord(correctWord);
    console.log('Ovo su pogodene rici');
    console.log(this.allGuessedWords);
    /* this.allInputWords.shift();
    this.guessedWords++; */
  }

  wrongWord(missedWord: string) {
    this.allWrongWords.push(missedWord);
    console.log('Ovo su promasene rici');
    console.log(this.allWrongWords);
  }


  deleteWord(word: string){
    for(let i = 0; i < this.allWordsQueue.length; i++){
      if(word == this.formatWord(this.allWordsQueue[i].title)){
       this.allWordsQueue.splice(i, 1);
      }
    }
  }

  formatWord(word: string): string {
    return word.split(' ').join('').toLowerCase();
  }
}
