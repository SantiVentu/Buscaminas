import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() detener: boolean = false;
  @Input() reset: boolean = false;

  tiempoTranscurrido: number = 0;
  intervalId: any = null;
  timerCorriendo: boolean = false;

  ngOnInit(): void {
    this.iniciarTemporizador();
  }

  ngOnChanges(): void {
    // Si el input `detener` es verdadero, detener el temporizador
    if (this.detener) {
      this.detenerTemporizador();
    }
    if (this.reset) {
      this.reiniciarTemporizador();
    }
  }
  ngOnDestroy(): void {
    this.detenerTemporizador();
  }

 

  iniciarTemporizador() {
  // Asegurarse de que no haya un intervalo previo corriendo
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
  this.tiempoTranscurrido = 0;
  this.timerCorriendo = true;

  // Iniciar el temporizador
  this.intervalId = setInterval(() => {
    this.tiempoTranscurrido++;
  }, 1000);  // Incrementar cada segundo
}

  detenerTemporizador() {
    if (this.timerCorriendo && this.intervalId) {
      clearInterval(this.intervalId);
      this.timerCorriendo = false;
    }
  }

  reiniciarTemporizador() {
    this.detenerTemporizador();
    this.tiempoTranscurrido = 0;
    this.iniciarTemporizador();
  }


  getFormattedTime(): string {
    const minutes = Math.floor(this.tiempoTranscurrido / 60).toString().padStart(2, '0');
    const seconds = (this.tiempoTranscurrido % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
}
