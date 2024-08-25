import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordContainerComponent } from './components/word-container/word-container.component';
import { WordGuesserComponent } from './components/word-guesser/word-guesser.component';
import { GuessedWordsComponent } from './guessed-words/guessed-words.component';

@NgModule({
  declarations: [AppComponent, WordContainerComponent, WordGuesserComponent, GuessedWordsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
