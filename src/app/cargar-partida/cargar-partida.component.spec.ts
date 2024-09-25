import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarPartidaComponent } from './cargar-partida.component';

describe('CargarPartidaComponent', () => {
  let component: CargarPartidaComponent;
  let fixture: ComponentFixture<CargarPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarPartidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargarPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
