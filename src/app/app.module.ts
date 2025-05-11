import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './pages/home/home.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultComponent } from './pages/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
