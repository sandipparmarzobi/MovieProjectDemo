import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTheaterComponent } from './add-theater.component';

describe('AddTheaterComponent', () => {
  let component: AddTheaterComponent;
  let fixture: ComponentFixture<AddTheaterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTheaterComponent]
    });
    fixture = TestBed.createComponent(AddTheaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
