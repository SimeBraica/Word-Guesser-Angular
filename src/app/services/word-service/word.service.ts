import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  removeDuplicates(allWords: string[]): string[] {
    return [...new Set(allWords)]
  }
}
