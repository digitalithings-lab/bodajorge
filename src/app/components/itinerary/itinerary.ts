import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './itinerary.html',
  styleUrls: ['./itinerary.css']
})
export class Itinerary {}
