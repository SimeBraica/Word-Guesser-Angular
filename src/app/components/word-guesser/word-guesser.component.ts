import { Component, OnInit } from '@angular/core';
import { WordToGuess } from '../../models/word-to-guess';
import { WordService } from '../../services/word-service/word.service';
import { DictionaryService } from '../../services/dictionary-service/dictionary.service';
import { Decimal } from 'decimal.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-word-guesser',
  templateUrl: './word-guesser.component.html',
  styleUrl: './word-guesser.component.scss',
})
export class WordGuesserComponent implements OnInit {
  constructor(
    private wordService: WordService,
    private dictionaryService: DictionaryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.allWords = history.state.numberOfWords;
    this.timeOnScreen = history.state.difficultyObject.timeForDifficulty;
    this.counterForAllWords = this.allWords;
    this.loadRandomWords();
  }

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
  numberOfInputWords: number = 0;

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
        timeOnScreen:
          Math.floor(Math.random() * (this.timeOnScreen - 100) + 100) / 100,
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
    this.numberOfInputWords++;
    this.sendInputWord = this.inputWord;
    this.inputWord = '';
  }

  isGameOver() {
    if (this.counterForAllWords == 0) {
      return true;
    }
    return false;
  }
  guessedWord(event: string) {
    console.log('all words u guessed wordu je: ', this.allWords);
    this.allGuessedWords.push(event);
    this.allGuessedWords = this.wordService.removeDuplicates(
      this.allGuessedWords
    );
    this.counterForAllWords--;
    this.isGameOver();
    this.guessedWords++;
    this.accuracy = this.setAccuracy(this.guessedWords, this.numberOfInputWords);
    this.deleteWord(event);
  }

  restartGame() {
    this.router.navigate(['/create-new-game']);
  }

  wordRanOut(event: string) {
    console.log('ja sam u funkciji roditelja wordRanOut');
    this.allWrongWords.push(event);
    this.deleteWord(event);
  }

  wrongWord(event: string) {
    console.log('all words u wrong wordu je: ', this.allWords);
    this.isGameOver();
    this.wrongWords++;
    this.accuracy = this.setAccuracy(this.guessedWords, this.numberOfInputWords);
    this.allWrongWords.push(event);
  }

  deleteWord(word: string) {
    for (let i = 0; i < this.allWordsQueue.length; i++) {
      if (word == this.formatWord(this.allWordsQueue[i].title)) {
        this.allWordsQueue.splice(i, 1);
      }
    }
  }

  setAccuracy(guessedWords: number, numberOfInputWords: number) {
    return ((guessedWords / numberOfInputWords) * 100).toFixed(3);
  }

  formatWord(word: string): string {
    return word.split(' ').join('').toLowerCase();
  }
}
