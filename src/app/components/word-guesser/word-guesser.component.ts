import { Component, numberAttribute, OnInit } from '@angular/core';
import { WordToGuess } from '../../models/word-to-guess';
import { WordService } from '../../services/word-service/word.service';
import { DictionaryService } from '../../services/dictionary-service/dictionary.service';
import { count } from 'rxjs';

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
    this.loadRandomWords();
  }

  titles: string[] = [];
  counterForAllWords: number = 10;
  allWordsQueue: WordToGuess[] = [];

  allWords: number = 10;
  guessedWords: number = 0;

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
    this.deleteWord(event);
  }

  wrongWord(event: string) {
    this.allWrongWords.push(event);
  }

  deleteWord(word: string) {
    for (let i = 0; i < this.allWordsQueue.length; i++) {
      if (word == this.formatWord(this.allWordsQueue[i].title)) {
        this.allWordsQueue.splice(i, 1);
      }
    }
  }

  formatWord(word: string): string {
    return word.split(' ').join('').toLowerCase();
  }
}
