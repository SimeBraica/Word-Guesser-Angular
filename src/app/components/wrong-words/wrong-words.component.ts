import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wrong-words',
  templateUrl: './wrong-words.component.html',
  styleUrl: './wrong-words.component.scss',
})
export class WrongWordsComponent {
  @Input()
  wrongWords: string[] = [];
}
