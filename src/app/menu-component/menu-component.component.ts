import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  standalone: true,
  imports: [],
  templateUrl: './menu-component.component.html',
  styleUrl: './menu-component.component.scss'
})
export class MenuComponentComponent {
  startSound = new Audio('/assets/startSoundEffect.mp3');

  constructor(private router: Router) {
    this.startSound.volume = 0.2;
  }

  startGame() {
    this.startSound.play();
    this.router.navigate(['/board']); // Navegar a la página de configuración del juego
  }

  loadGame() {
    this.router.navigate(['/cargar-partida']); // Navegar a la página de cargar partidas
  }

  opciones() {
    // Aquí podrías implementar las opciones o una navegación a otro componente
    this.router.navigate(['/setup']);

  }

}
