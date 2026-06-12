import { Routes } from '@angular/router';
import { InvitacionPage } from './invitacion-page/invitacion-page';

export const routes: Routes = [
  // Ruta con nombre del invitado: ej. /Jesus o /Jesus%20Ayza
  { path: ':invitado', component: InvitacionPage },
  // Ruta sin nombre (invitado genérico)
  { path: '', component: InvitacionPage }
];