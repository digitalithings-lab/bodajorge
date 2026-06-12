import { ChangeDetectionStrategy, Component, signal, OnInit, OnDestroy } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dress-code',
  standalone: true,
  imports: [NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dress-code.html',
  styleUrls: ['./dress-code.css']
})
export class DressCode implements OnInit, OnDestroy {
  currentDamaImg = signal<number>(0);
  currentCaballeroImg = signal<number>(0);

  damasImages = [
    "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop"
  ];

  caballerosImages = [
    "https://images.unsplash.com/photo-1593030761757-71fae46af504?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594938298596-70f581d68364?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop"
  ];

  private carouselInterval: any;

  ngOnInit(): void {
    this.carouselInterval = setInterval(() => {
      this.currentDamaImg.update(idx => (idx + 1) % this.damasImages.length);
      this.currentCaballeroImg.update(idx => (idx + 1) % this.caballerosImages.length);
    }, 3500);
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }
}
