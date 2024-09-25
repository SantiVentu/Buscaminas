import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaGuardada } from '../../Models/PartidaGuardada';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cargar-partida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargar-partida.component.html',
  styleUrls: ['./cargar-partida.component.scss']
})
export class CargarPartidaComponent implements OnInit {
  partidasGuardadas: PartidaGuardada[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const partidas = JSON.parse(localStorage.getItem('partidasGuardadas') || '[]');
    this.partidasGuardadas = partidas;
  }

  cargarPartida(id: string) {
    const partidas = JSON.parse(localStorage.getItem('partidasGuardadas') || '[]');
    const partida = partidas.find((p: PartidaGuardada) => p.id === id);

    if (partida) {
      localStorage.setItem('estadoJuego', JSON.stringify(partida.gameState));
      localStorage.setItem('cargarPartida', 'true');
      this.router.navigate(['/board']);
    }
  }


  eliminarPartida(id: string) {
    let partidas = JSON.parse(localStorage.getItem('partidasGuardadas') || '[]');
    partidas = partidas.filter((p: PartidaGuardada) => p.id !== id);
    localStorage.setItem('partidasGuardadas', JSON.stringify(partidas));
    this.partidasGuardadas = partidas; //aca actualiza denuevo las partidas guardadas
  }

  volver() {
    this.router.navigate(['/menu']);
  }
}
