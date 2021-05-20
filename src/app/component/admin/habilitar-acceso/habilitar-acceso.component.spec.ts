import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitarAccesoComponent } from './habilitar-acceso.component';

describe('HabilitarAccesoComponent', () => {
  let component: HabilitarAccesoComponent;
  let fixture: ComponentFixture<HabilitarAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabilitarAccesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitarAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
