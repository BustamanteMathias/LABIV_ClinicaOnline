import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPerfilProfesinalComponent } from './mi-perfil-profesinal.component';

describe('MiPerfilProfesinalComponent', () => {
  let component: MiPerfilProfesinalComponent;
  let fixture: ComponentFixture<MiPerfilProfesinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiPerfilProfesinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiPerfilProfesinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
