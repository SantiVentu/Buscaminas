import { Routes } from '@angular/router';
import { SetupComponentComponent } from './setup-component/setup-component.component';
import { BoardComponentComponent } from './board-component/board-component.component';
import { CargarPartidaComponent } from './cargar-partida/cargar-partida.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';

export const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'setup', component: SetupComponentComponent },
  { path: 'board', component: BoardComponentComponent },
  { path: 'cargar-partida', component: CargarPartidaComponent},
  { path: 'menu', component: MenuComponentComponent},
  { path: '*', redirectTo: '/menu', pathMatch: 'full' },


];
