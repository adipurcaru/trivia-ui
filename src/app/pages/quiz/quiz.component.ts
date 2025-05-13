import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Question } from '../../models/question.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  currentIndex: number = 0;
  currentQuestion!: Question;
  selectedAnswer: string | null = null;
  correctAnswer: string | null = null;
  feedbackMessage: string | null = null;
  score: number = 0;

  timer = 15;
  timerProgress = 100;
  intervalId: any;
  loading = true;

  constructor(private quizService: QuizService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const type = this.route.snapshot.url[1]?.path || 'cultura';

    this.quizService.getQuestions(type).subscribe(qs => {
      this.questions = qs;
      this.loading = false;
      this.loadQuestion();
      // this.currentQuestion = this.questions[this.currentIndex];
    });

    // this.quizService.getQuestions().subscribe({
    //   next: (qs) => {
    //     this.questions = qs;
    //     this.loading = false;
    //     this.loadQuestion();
    //   },
    //   error: (err) => {
    //     console.error('Eroare la incarcare intrebari:', err);
    //     this.loading = false;
    //   }
    // });
  }

  loadQuestion(): void {
    this.currentQuestion = this.questions[this.currentIndex];
    this.selectedAnswer = null;
    this.correctAnswer = this.currentQuestion.correctAnswer;
    this.feedbackMessage = null;
    this.timer = 15;
    this.timerProgress = 100;

    this.intervalId = setInterval(() => {
      this.timer--;
      this.timerProgress = (this.timer / 15) * 100;
      if (this.timer <= 0) {
        clearInterval(this.intervalId);
        this.selectAnswer(null);
      }
    }, 1000);
  }

  selectAnswer(answer: string | null): void {
    if (this.selectedAnswer) return; // prevenim dublu click
    clearInterval(this.intervalId);
    this.selectedAnswer = answer;

    if (answer === this.correctAnswer) {
      this.score++;
      this.feedbackMessage = 'Corect!';
    } else {
      this.feedbackMessage = 'Gresit!';
    }

    setTimeout(() => {
      this.feedbackMessage = null;
      this.nextQuestion();
    }, 1500);
  }

  nextQuestion(): void {
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.loadQuestion();
    } else {
      this.router.navigate(['/rezultat'], {
        state: { score: this.score, total: this.questions.length }
      });
    }
  }
}
