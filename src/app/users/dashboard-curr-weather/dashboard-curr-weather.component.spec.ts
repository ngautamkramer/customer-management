import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCurrWeatherComponent } from './dashboard-curr-weather.component';

describe('DashboardCurrWeatherComponent', () => {
  let component: DashboardCurrWeatherComponent;
  let fixture: ComponentFixture<DashboardCurrWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCurrWeatherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardCurrWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
