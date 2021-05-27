import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarConMensajeComponent } from './confirmar-con-mensaje.component';

describe('ConfirmarConMensajeComponent', () => {
  let component: ConfirmarConMensajeComponent;
  let fixture: ComponentFixture<ConfirmarConMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarConMensajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarConMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
