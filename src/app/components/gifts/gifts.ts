import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-gifts',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gifts.html',
  styleUrls: ['./gifts.css']
})
export class Gifts {}
