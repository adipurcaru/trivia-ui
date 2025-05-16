import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class QuizService {
    //private apiUrl = 'http://localhost:8080/quiz/questions';

    private apiUrl = "https://trivia-service.onrender.com/quiz/questions";


    constructor(private http: HttpClient) {}

    getQuestions(type: string): Observable<Question[]> {
        return this.http.get<Question[]>(`${this.apiUrl}?type=${type}&count=10`);
    }

}
