import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUsuariosTestComponent } from './login-usuarios-test.component';

describe('LoginUsuariosTestComponent', () => {
  let component: LoginUsuariosTestComponent;
  let fixture: ComponentFixture<LoginUsuariosTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginUsuariosTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUsuariosTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
