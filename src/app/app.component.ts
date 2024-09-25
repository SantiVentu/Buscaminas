import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'buscaminasAngular';


  isSoundOn = true;
  audio = new Audio('/assets/menuSoundEffect.mp3');
  
  constructor() {
    this.audio.volume = 0.2;
}

  toggleSound() {
    this.isSoundOn = !this.isSoundOn;
    if (this.isSoundOn) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

}
