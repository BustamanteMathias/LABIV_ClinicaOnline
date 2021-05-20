import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhabilitarAccesoComponent } from './inhabilitar-acceso.component';

describe('InhabilitarAccesoComponent', () => {
  let component: InhabilitarAccesoComponent;
  let fixture: ComponentFixture<InhabilitarAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InhabilitarAccesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InhabilitarAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
