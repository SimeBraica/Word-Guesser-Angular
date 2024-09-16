import { Component, ElementRef, OnInit } from '@angular/core';
import { WordToGuess } from '../../models/word-to-guess';
import { WordService } from '../../services/word-service/word.service';
import { DictionaryService } from '../../services/dictionary-service/dictionary.service';
import { Decimal } from 'decimal.js';

@Component({
  selector: 'app-word-guesser',
  templateUrl: './word-guesser.component.html',
  styleUrl: './word-guesser.component.scss',
})
export class WordGuesserComponent implements OnInit {
  constructor(
    private wordService: WordService,
    private dictionaryService: DictionaryService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.allWords = history.state.numberOfWords;
    this.timeOnScreen = history.state.difficultyObject.timeForDifficulty;
    this.counterForAllWords = this.allWords;
    this.loadRandomWords();
/*     this.moveWordObjects();
 */  }

  titles: string[] = [];
  counterForAllWords: number = 0;
  allWordsQueue: WordToGuess[] = [];
  allWords: number = 0;

  guessedWords: number = 0;
  wrongWords: number = 0;

  accuracy: Decimal.Value = 0;
  sendInputWord: string = '';
  inputWord: string = '';
  timeOnScreen: number = 0;

  allWrongWords: string[] = [];
  allGuessedWords: string[] = [];

  loadRandomWords() {
    this.dictionaryService
      .getRandomWords(this.allWords)
      .subscribe((data: string[]) => {
        this.titles = data;
      });
  }

  isTitlesEmpty(): boolean {
    if (this.titles.length == this.allWords) {
      this.createAndFillWordObject();
      return true;
    }
    return false;
  }

  createAndFillWordObject() {
    this.titles.forEach((title) => {
      let newWordToGuess: WordToGuess = {
        title: title,
        timeOnScreen: Math.floor(Math.random() * (this.timeOnScreen - 100) + 100) / 100,
        isCorrect: false,
      };
      if (this.allWordsQueue.length >= this.counterForAllWords) {
        return;
      }
      this.allWordsQueue.push(newWordToGuess);
    });
  }

  /* moveWordObjects(){
    console.log("usao u funkciju moveWordObjects");
    this.elementRef.nativeElement.allWordsQueue[0].display = "none";
  } */
  setWord() {
    if (this.inputWord == '') {
      return;
    }
    this.sendInputWord = this.inputWord;
    this.inputWord = '';
  }

  guessedWord(event: string) {
    this.allGuessedWords.push(event);
    this.allGuessedWords = this.wordService.removeDuplicates(
      this.allGuessedWords
    );
    this.counterForAllWords--;
    this.guessedWords++;
    this.accuracy = this.setAccuracy(10, this.guessedWords, this.wrongWords);
    this.deleteWord(event);
  }

  wrongWord(event: string) {
    this.wrongWords++;
    this.accuracy = this.setAccuracy(10, this.guessedWords, this.wrongWords);
    this.allWrongWords.push(event);
  }

  deleteWord(word: string) {
    for (let i = 0; i < this.allWordsQueue.length; i++) {
      if (word == this.formatWord(this.allWordsQueue[i].title)) {
        this.allWordsQueue.splice(i, 1);
      }
    }
  }

  setAccuracy(allWords: number, guessedWords: number, wrongWords: number) {
    return ((guessedWords / (allWords + wrongWords)) * 100).toFixed(3);
  }

  formatWord(word: string): string {
    return word.split(' ').join('').toLowerCase();
  }
}
