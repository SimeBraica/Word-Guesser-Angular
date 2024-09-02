import { Component, OnInit } from '@angular/core';
import { WordToGuess } from '../../models/word-to-guess';
import { WordService } from '../../services/word-service/word.service';
import { DictionaryService } from '../../services/dictionary-service/dictionary.service';

@Component({
  selector: 'app-word-guesser',
  templateUrl: './word-guesser.component.html',
  styleUrl: './word-guesser.component.scss',
})
export class WordGuesserComponent implements OnInit {
  titles: string[] = [];

  allWordsQueue: WordToGuess[] = [];
  constructor(
    private wordService: WordService,
    private dictionaryService: DictionaryService
  ) {}

  ngOnInit() {
    this.loadRandomWords();
  }
  loadRandomWords() {
    this.dictionaryService.getRandomWords().subscribe((data: string[]) => {
      console.log('ja sam u funkciji loadRandomWords i ispod mene je data');
      console.log(data);
      this.titles = data;
    });
  }

  isTitlesEmpty(): boolean {
    console.log('u funkciji sam koja se zove isTitlesEmpty()');
    console.log(this.titles);
    if (this.titles.length == 10) {
      this.createAndFillWordObject();
      return true;
    }
    return false;
  }

  createAndFillWordObject() {
    console.log("ispod mene je duzina title");
    console.log(this.titles.length);
    this.titles.forEach((title) => {
      let newWordToGuess: WordToGuess = {
        title: title,
        timeOnScreen: 12,
        isCorrect: false,
      };
      console.log("ispod mene je newWordToGuess objekt");
      console.log(newWordToGuess);
      this.allWordsQueue.push(newWordToGuess);
    });
  }
  allWords: number = this.allWordsQueue.length;
  guessedWords: number = 0;

  sendInputWord: string = '';
  inputWord: string = '';

  allWrongWords: string[] = [];
  allGuessedWords: string[] = [];

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
