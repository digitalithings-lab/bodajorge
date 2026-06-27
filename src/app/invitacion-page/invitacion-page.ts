import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  OnDestroy, OnInit, signal, inject, ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Invitado, InvitadoService } from '../services/invitado.service';

@Component({
  selector: 'app-invitacion-page',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invitacion-page.html',
  styleUrls: ['./invitacion-page.css']
})
export class InvitacionPage implements OnInit, OnDestroy {
  player: any;
  isMusicPlaying = signal<boolean>(false);
  isPlayerReady = signal<boolean>(false);

 public id:any
  // ─── Guest name desde la ruta /:invitado ───────────────────────────────────
  guestName = signal<string>('Querido Invitado');

  // ─── Hero ──────────────────────────────────────────────────────────────────
  isLoaded = signal<boolean>(false);
  private loadTimeout: any;

  // ─── Countdown ─────────────────────────────────────────────────────────────
  countdownDays    = signal<number>(0);
  countdownHours   = signal<number>(0);
  countdownMinutes = signal<number>(0);
  countdownSeconds = signal<number>(0);
  private countdownInterval: any;

  // ─── Dress Code Carousel ───────────────────────────────────────────────────
  currentDamaImg      = signal<number>(0);
  currentCaballeroImg = signal<number>(0);
  private carouselInterval: any;

  damasImages = [
    'assets/images/dama_rosa_empolvado_humana_1782445867938.png',
    'assets/images/dama_lila_pastel_humana_1782445876472.png',
    'assets/images/dama_amarillo_mantequilla_humana_1782445885610.png',
    'assets/images/dama_durazno_pastel_humana_1782445893345.png',
    'assets/images/dama_verde_salvia_humana_1782445901408.png'
  ];

  caballerosImages = [
    'assets/images/caballero_lightgrey_1781750562523.png',
    'assets/images/caballero_beige_1781750569983.png',
    'assets/images/caballero_darkgrey_1781750579204.png'
  ];

  private whatsappNumber = '50762734608';

  get rsvpLink(): string {
    const msg = encodeURIComponent(
      `¡Hola! Estoy confirmando mi asistencia a la boda de Jorge y Eva.  ¡Nos vemos pronto!`
    );
    return `https://wa.me/${this.whatsappNumber}?text=${msg}`;
  }

  get rsvpDeclineLink(): string {
    const msg = encodeURIComponent(
      `¡Hola! No podré asistir. `
    );
    return `https://wa.me/${this.whatsappNumber}?text=${msg}`;
  }

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private service: InvitadoService
  ) {}

  // ─── Lifecycle ─────────────────────────────────────────────────────────────
  ngOnInit(): void {
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    (window as any).onYouTubeIframeAPIReady = () => {
      this.player = new (window as any).YT.Player('ytplayer', {
        events: {
          'onReady': this.onPlayerReady.bind(this),
          'onStateChange': this.onPlayerStateChange.bind(this)
        }
      });
    };

    // Leer el parámetro de la ruta (ej: /Jesus)
    this.route.paramMap.subscribe(params => {
      this.id = params.get('invitado');
      console.log(this.id);

      if (this.id) {
        this.guestName.set(decodeURIComponent(this.id));
        this.cdr.markForCheck();
      }


      this.obtenerdatos();
    });
    

    // Hero
    this.loadTimeout = setTimeout(() => this.isLoaded.set(true), 100);

    // Countdown hacia el 19-sep-2026
    const weddingDate = new Date('2026-09-19T13:30:00').getTime();
    this.updateCountdown(weddingDate);
    this.countdownInterval = setInterval(() => this.updateCountdown(weddingDate), 1000);

    // Carousel
    this.carouselInterval = setInterval(() => {
      this.currentDamaImg.update(i => (i + 1) % this.damasImages.length);
      this.currentCaballeroImg.update(i => (i + 1) % this.caballerosImages.length);
    }, 3500);
  }

  ngOnDestroy(): void {
    clearTimeout(this.loadTimeout);
    clearInterval(this.countdownInterval);
    clearInterval(this.carouselInterval);
  }

  private updateCountdown(weddingDate: number): void {
    const distance = weddingDate - Date.now();
    if (distance < 0) { clearInterval(this.countdownInterval); return; }
    this.countdownDays.set(Math.floor(distance / 86_400_000));
    this.countdownHours.set(Math.floor((distance % 86_400_000) / 3_600_000));
    this.countdownMinutes.set(Math.floor((distance % 3_600_000) / 60_000));
    this.countdownSeconds.set(Math.floor((distance % 60_000) / 1_000));
  }

public nombre:any
public mensaje:any
public mensaje2:any
public mesa:any
public puestos:any
obtenerdatos() {
  const data = {
    id: this.id
  };

  this.service.getinvitados(data).subscribe(resp => {

    if (resp.success === true) {
      console.log(resp);

      this.nombre = resp.data.nombre;
      this.mesa = resp.data.mesa; 
      this.puestos = resp.data.npuestos; // Asegurarse de usar npuestos

      if (!resp.data.mensaje || resp.data.mensaje.trim() === '') {
        this.mensaje = 'Hay momentos en la vida que son especiales por sí solos, pero compartirlos con las personas que más queremos los hace inolvidables. Tenemos el inmenso honor de invitarte a celebrar el comienzo de nuestra nueva vida juntos.';
      } else {
        this.mensaje = resp.data.mensaje;
      }

      this.cdr.markForCheck(); // CRÍTICO: Forzar detección de cambios
    }
  });
}

  nextDamaImg() {
    this.currentDamaImg.update(i => (i + 1) % this.damasImages.length);
    this.resetCarouselInterval();
  }
  prevDamaImg() {
    this.currentDamaImg.update(i => (i - 1 + this.damasImages.length) % this.damasImages.length);
    this.resetCarouselInterval();
  }
  nextCaballeroImg() {
    this.currentCaballeroImg.update(i => (i + 1) % this.caballerosImages.length);
    this.resetCarouselInterval();
  }
  prevCaballeroImg() {
    this.currentCaballeroImg.update(i => (i - 1 + this.caballerosImages.length) % this.caballerosImages.length);
    this.resetCarouselInterval();
  }

  resetCarouselInterval() {
    clearInterval(this.carouselInterval);
    this.carouselInterval = setInterval(() => {
      this.currentDamaImg.update(i => (i + 1) % this.damasImages.length);
      this.currentCaballeroImg.update(i => (i + 1) % this.caballerosImages.length);
    }, 3500);
  }

  onPlayerReady(event: any) {
    this.isPlayerReady.set(true);
    // Intentar reproducir automáticamente (el navegador puede bloquearlo hasta hacer clic)
    event.target.playVideo();
  }

  onPlayerStateChange(event: any) {
    // 1 = PLAYING, 2 = PAUSED
    if (event.data === 1) {
      this.isMusicPlaying.set(true);
    } else {
      this.isMusicPlaying.set(false);
    }
  }

  toggleMusic() {
    if (!this.player) return;
    if (this.isMusicPlaying()) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
    }
  }
}
