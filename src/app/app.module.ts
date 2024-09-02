import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordContainerComponent } from './components/word-container/word-container.component';
import { WordGuesserComponent } from './components/word-guesser/word-guesser.component';
import { GuessedWordsComponent } from './guessed-words/guessed-words.component';
import { WrongWordsComponent } from './components/wrong-words/wrong-words.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent, WordContainerComponent, WordGuesserComponent, GuessedWordsComponent, WrongWordsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
