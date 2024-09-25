import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { BoardComponentComponent } from "./board-component/board-component.component";
import { SetupComponentComponent } from "./setup-component/setup-component.component";
import { CargarPartidaComponent } from "./cargar-partida/cargar-partida.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, BoardComponentComponent, SetupComponentComponent, CargarPartidaComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  title = 'buscaminasAngular';


  isSoundOn = true;
  audio = new Audio('/assets/menuSoundEffect.mp3');

  constructor() {
}
  ngOnInit(): void {
    this.audio.loop = true;  // Hacer que el sonido se repita en bucle
    this.audio.volume = 0.3;
    this.playMusic();
  }

  toggleSound() {
    this.isSoundOn = !this.isSoundOn;
    if (this.isSoundOn) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  playMusic(): void {
    this.audio.play().catch(error => {
    });
  }
}
