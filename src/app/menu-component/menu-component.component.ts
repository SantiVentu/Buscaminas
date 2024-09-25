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
    this.startSound.volume = 0.3;
  }

  startGame() {
    this.startSound.play();
    this.router.navigate(['/board']);
  }

  loadGame() {
    this.router.navigate(['/cargar-partida']);
  }

  opciones() {
    this.router.navigate(['/setup']);
  }

}
