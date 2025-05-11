import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  score: number = 0;
  total: number = 10;
  animatedScore = 0;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { score: number; total: number };
    if (state) {
      this.score = state.score;
      this.total = state.total;
    }
  }


  ngOnInit(): void {
    this.animateScore();
    if (this.score >= 7) {
      this.launchConfetti();
    }
  }

  launchConfetti(): void {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
  }

  getFeedbackMessage(): string {
    const percent = this.score / this.total;
    if (percent >= 0.8) return 'Excelent! 👏';
    if (percent >= 0.5) return 'Bine jucat! 👍';
    return 'Mai încearcă! 💡';
  }

  restartQuiz(): void {
    this.router.navigate(['/']);
  }

  animateScore(): void {
    const step = Math.ceil(this.score / 30);
    const interval = setInterval(() => {
      this.animatedScore += step;
      if (this.animatedScore >= this.score) {
        this.animatedScore = this.score;
        clearInterval(interval);
      }
    }, 30);
  }
}
