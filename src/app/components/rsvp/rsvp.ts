import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rsvp.html',
  styleUrls: ['./rsvp.css']
})
export class Rsvp {
  @Input() guestName: string = 'Querido Invitado';

  whatsappNumber = '50762734608';

  get whatsappMessage() {
    return encodeURIComponent(`¡Hola! Soy ${this.guestName} y confirmo mi asistencia a la boda de Jorge y Eva. 🥂`);
  }

  get rsvpLink() {
    return `https://wa.me/${this.whatsappNumber}?text=${this.whatsappMessage}`;
  }
}
