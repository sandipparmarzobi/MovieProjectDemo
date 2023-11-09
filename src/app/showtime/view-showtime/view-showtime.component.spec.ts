import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShowtimeComponent } from './view-showtime.component';

describe('ViewShowtimeComponent', () => {
  let component: ViewShowtimeComponent;
  let fixture: ComponentFixture<ViewShowtimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewShowtimeComponent]
    });
    fixture = TestBed.createComponent(ViewShowtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
