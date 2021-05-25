import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProfesionalComponent } from './card-profesional.component';

describe('CardProfesionalComponent', () => {
  let component: CardProfesionalComponent;
  let fixture: ComponentFixture<CardProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
