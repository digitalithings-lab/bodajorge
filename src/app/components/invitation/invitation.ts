import { ChangeDetectionStrategy, Component, Input, signal, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invitation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invitation.html',
  styleUrls: ['./invitation.css']
})
export class Invitation implements OnInit, OnDestroy {
  @Input() guestName: string = 'Querido Invitado';

  // Countdown State
  countdownDays = signal<number>(0);
  countdownHours = signal<number>(0);
  countdownMinutes = signal<number>(0);
  countdownSeconds = signal<number>(0);
  public id:any
  private countdownInterval: any;
 constructor(private route: ActivatedRoute){

 }
  ngOnInit(): void {
    const weddingDate = new Date('2026-09-19T13:30:00').getTime();
    this.updateCountdown(weddingDate);
    this.countdownInterval = setInterval(() => {
      this.updateCountdown(weddingDate);
    }, 1000);


    const id = this.route.snapshot.paramMap.get('id');
   console.log(id);
   

    console.log("holaaaas");
    
  }

  private updateCountdown(weddingDate: number): void {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      return;
    }

    this.countdownDays.set(Math.floor(distance / (1000 * 60 * 60 * 24)));
    this.countdownHours.set(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.countdownMinutes.set(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    this.countdownSeconds.set(Math.floor((distance % (1000 * 60)) / 1000));
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
