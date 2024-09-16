import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordContainerComponent } from './components/word-container/word-container.component';
import { WordGuesserComponent } from './components/word-guesser/word-guesser.component';
import { GuessedWordsComponent } from './components/guessed-words/guessed-words.component';
import { WrongWordsComponent } from './components/wrong-words/wrong-words.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CreateNewGameComponent } from './components/create-new-game/create-new-game.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StartComponent } from './components/start/start.component';
@NgModule({
  declarations: [
    AppComponent,
    WordContainerComponent,
    GuessedWordsComponent,
    WrongWordsComponent,
    WordGuesserComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    CreateNewGameComponent
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule {}
