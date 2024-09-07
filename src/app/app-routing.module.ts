import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordGuesserComponent } from './components/word-guesser/word-guesser.component';
import { CreateNewGameComponent } from './components/create-new-game/create-new-game.component';

const routes: Routes = [
  { path: '', redirectTo: '/create-new-game', pathMatch: 'full' }, 
  { path: 'create-new-game', component: CreateNewGameComponent },
  { path: 'word-guesser', component: WordGuesserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
