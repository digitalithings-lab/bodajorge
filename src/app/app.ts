import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; background: #FDFBF7; }

    .font-script  { font-family: 'Alex Brush', cursive; }
    .font-serif   { font-family: 'Cormorant Garamond', serif; }
    .font-sans    { font-family: 'Montserrat', sans-serif; }

    .fade-in-up {
      opacity: 0;
      transform: translateY(30px);
      animation: fadeInUp 1.5s ease-out forwards;
    }
    @keyframes fadeInUp {
      to { opacity: 1; transform: translateY(0); }
    }

    .text-shadow-blur { text-shadow: 0px 4px 15px rgba(0,0,0,0.25); }

    .heart-float {
      position: absolute;
      bottom: -100px;
      animation: float 7s ease-in infinite;
      opacity: 0;
    }
    @keyframes float {
      0%   { transform: translateY(0) scale(0.5);   opacity: 0; }
      20%  { opacity: 0.8; }
      100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
    }
  `],
  template: `<router-outlet></router-outlet>`
})
export class App {}