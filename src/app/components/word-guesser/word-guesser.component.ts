import { Component, numberAttribute, OnInit } from '@angular/core';
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
    private dictionaryService: DictionaryService
  ) {}

  ngOnInit() {
    console.log('accuracy: ' + this.accuracy);
    this.loadRandomWords();
  }

  titles: string[] = [];
  counterForAllWords: number = 10;
  allWordsQueue: WordToGuess[] = [];

  allWords: number = 10;
  guessedWords: number = 0;
  wrongWords: number = 0;
  accuracy: Decimal.Value = 0;

  sendInputWord: string = '';
  inputWord: string = '';

  allWrongWords: string[] = [];
  allGuessedWords: string[] = [];

  loadRandomWords() {
    this.dictionaryService.getRandomWords().subscribe((data: string[]) => {
      this.titles = data;
    });
  }

  isTitlesEmpty(): boolean {
    console.log("usa u funkciju isTitlesEmpty");
    if (this.titles.length == 10) {
      this.createAndFillWordObject();
      return true;
    }
    return false;
  }

  createAndFillWordObject() {
    this.titles.forEach((title) => {
      let newWordToGuess: WordToGuess = {
        title: title,
        timeOnScreen: 12,
        isCorrect: false,
      };
      if (this.allWordsQueue.length >= this.counterForAllWords) {
        return;
      }
      this.allWordsQueue.push(newWordToGuess);
    });
  }
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
    console.log("guessedWords: " + this.guessedWords)
    console.log("wrongWords: " + this.wrongWords);
    this.accuracy = this.setAccuracy(10, this.guessedWords, this.wrongWords);
    this.deleteWord(event);
    console.log("allWords nakon guessed");
    console.log(this.allWordsQueue);
  }

  wrongWord(event: string) {
    this.wrongWords++;
    this.accuracy = this.setAccuracy(10, this.guessedWords, this.wrongWords);
    this.allWrongWords.push(event);
    console.log("allWords nakon wrong");
    console.log(this.allWordsQueue);
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
