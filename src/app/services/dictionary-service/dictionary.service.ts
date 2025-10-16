import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WordToGuess } from '../../models/word-to-guess';
@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'https://random-word-api.vercel.app/api?words=';

  getRandomWords(numberOfWords: number): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + numberOfWords);
  }
}
