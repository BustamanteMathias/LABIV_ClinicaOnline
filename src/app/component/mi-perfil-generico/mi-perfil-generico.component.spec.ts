import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPerfilGenericoComponent } from './mi-perfil-generico.component';

describe('MiPerfilGenericoComponent', () => {
  let component: MiPerfilGenericoComponent;
  let fixture: ComponentFixture<MiPerfilGenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiPerfilGenericoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiPerfilGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
