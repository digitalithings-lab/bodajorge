import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {}
