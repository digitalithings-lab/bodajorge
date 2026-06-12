import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero implements OnInit, OnDestroy {
  isLoaded = signal<boolean>(false);
  private loadTimeout: any;

  ngOnInit(): void {
    this.loadTimeout = setTimeout(() => this.isLoaded.set(true), 100);
  }

  ngOnDestroy(): void {
    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout);
    }
  }
}
