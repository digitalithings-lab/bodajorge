import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Invitado {
  id?: string;
  nombre: string;
  confirmado?: boolean;
  fechaConfirmacion?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class InvitadoService {
  private url ='https://backendjs-8z5p.onrender.com/api/examples/'

constructor(private http:HttpClient){
}
  /**
   * Obtiene el nombre del invitado desde el parámetro de ruta.
   * Decodifica caracteres especiales (ej: %20 → espacio).
   */
  decodificarNombre(param: string | null): string {
    if (!param) return 'Querido Invitado';
    return decodeURIComponent(param);
  }



  obtenerinvitado(){}

  /**
   * Genera el link de WhatsApp para confirmar asistencia.
   */
  generarLinkRSVP(nombreInvitado: string, numeroWhatsapp: string): string {
    const mensaje = encodeURIComponent(
      `¡Hola! Soy ${nombreInvitado} y confirmo mi asistencia a la boda de Jorge y Eva. 🥂`
    );
    return `https://wa.me/${numeroWhatsapp}?text=${mensaje}`;
  }

  /**
   * Calcula el tiempo restante para la boda.
   */
  calcularCountdown(fechaBoda: Date): {
    dias: number;
    horas: number;
    minutos: number;
    segundos: number;
    terminado: boolean;
  } {
    const distancia = fechaBoda.getTime() - Date.now();

    if (distancia <= 0) {
      return { dias: 0, horas: 0, minutos: 0, segundos: 0, terminado: true };
    }

    return {
      dias:     Math.floor(distancia / 86_400_000),
      horas:    Math.floor((distancia % 86_400_000) / 3_600_000),
      minutos:  Math.floor((distancia % 3_600_000) / 60_000),
      segundos: Math.floor((distancia % 60_000) / 1_000),
      terminado: false
    };
  }


  getinvitados(data:any){
    return this.http.post<any>(this.url+`getinvitador`,data);

  }
}
