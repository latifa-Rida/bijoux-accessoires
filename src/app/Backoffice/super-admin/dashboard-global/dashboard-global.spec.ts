import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGlobal } from './dashboard-global';

describe('DashboardGlobal', () => {
  let component: DashboardGlobal;
  let fixture: ComponentFixture<DashboardGlobal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGlobal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGlobal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
