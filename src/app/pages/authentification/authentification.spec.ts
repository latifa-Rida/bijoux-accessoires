import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Authentification } from './authentification';

describe('Authentification', () => {
  let component: Authentification;
  let fixture: ComponentFixture<Authentification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Authentification, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Authentification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
