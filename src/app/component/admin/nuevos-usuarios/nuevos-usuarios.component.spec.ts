import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevosUsuariosComponent } from './nuevos-usuarios.component';

describe('NuevosUsuariosComponent', () => {
  let component: NuevosUsuariosComponent;
  let fixture: ComponentFixture<NuevosUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevosUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
