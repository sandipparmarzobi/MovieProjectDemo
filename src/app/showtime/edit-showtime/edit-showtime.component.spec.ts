import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShowtimeComponent } from './edit-showtime.component';

describe('EditShowtimeComponent', () => {
  let component: EditShowtimeComponent;
  let fixture: ComponentFixture<EditShowtimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditShowtimeComponent]
    });
    fixture = TestBed.createComponent(EditShowtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
