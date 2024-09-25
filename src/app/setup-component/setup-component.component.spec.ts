import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupComponentComponent } from './setup-component.component';

describe('SetupComponentComponent', () => {
  let component: SetupComponentComponent;
  let fixture: ComponentFixture<SetupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
