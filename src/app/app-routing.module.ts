import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultComponent } from './pages/result/result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz/cultura_generala', component: QuizComponent },
  { path: 'quiz/capitale', component: QuizComponent },
  { path: 'rezultat', component: ResultComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
