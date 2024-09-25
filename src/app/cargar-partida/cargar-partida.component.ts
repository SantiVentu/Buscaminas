import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaGuardada } from '../../Models/PartidaGuardada';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cargar-partida',
  standalone: true,  // Indica que el componente es standalone
  imports: [CommonModule],  // Agregamos CommonModule aquí
  templateUrl: './cargar-partida.component.html',
  styleUrls: ['./cargar-partida.component.scss']
})
export class CargarPartidaComponent implements OnInit {
  partidasGuardadas: PartidaGuardada[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Cargar las partidas guardadas desde localStorage
    const partidas = JSON.parse(localStorage.getItem('partidasGuardadas') || '[]');
    this.partidasGuardadas = partidas;
  }

  cargarPartida(id: string) {
    const partidas = JSON.parse(localStorage.getItem('partidasGuardadas') || '[]');
    const partida = partidas.find((p: PartidaGuardada) => p.id === id);

    if (partida) {
      localStorage.setItem('estadoJuego', JSON.stringify(partida.gameState));  // Guardar el estado de la partida seleccionada
      localStorage.setItem('cargarPartida', 'true');  // Establecer la bandera para cargar la partida
      this.router.navigate(['/board']);  // Redirigir al tablero
    }
  }


  eliminarPartida(id: string) {
    let partidas = JSON.parse(localStorage.getItem('partidasGuardadas') || '[]');
    partidas = partidas.filter((p: PartidaGuardada) => p.id !== id);
    localStorage.setItem('partidasGuardadas', JSON.stringify(partidas));
    this.partidasGuardadas = partidas;  // Actualizar la lista en la vista
  }

  volver() {
    this.router.navigate(['/menu']);
  }
}
