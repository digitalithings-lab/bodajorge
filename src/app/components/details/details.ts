import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class Details {}
