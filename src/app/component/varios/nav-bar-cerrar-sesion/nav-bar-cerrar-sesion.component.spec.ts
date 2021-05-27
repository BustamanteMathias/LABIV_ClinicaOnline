import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarCerrarSesionComponent } from './nav-bar-cerrar-sesion.component';

describe('NavBarCerrarSesionComponent', () => {
  let component: NavBarCerrarSesionComponent;
  let fixture: ComponentFixture<NavBarCerrarSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarCerrarSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarCerrarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
