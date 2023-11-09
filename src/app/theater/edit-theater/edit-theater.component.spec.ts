import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTheaterComponent } from './edit-theater.component';

describe('EditTheaterComponent', () => {
  let component: EditTheaterComponent;
  let fixture: ComponentFixture<EditTheaterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTheaterComponent]
    });
    fixture = TestBed.createComponent(EditTheaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
