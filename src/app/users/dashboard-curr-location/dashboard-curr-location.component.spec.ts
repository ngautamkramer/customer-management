import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCurrLocationComponent } from './dashboard-curr-location.component';

describe('DashboardCurrLocationComponent', () => {
  let component: DashboardCurrLocationComponent;
  let fixture: ComponentFixture<DashboardCurrLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCurrLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardCurrLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
