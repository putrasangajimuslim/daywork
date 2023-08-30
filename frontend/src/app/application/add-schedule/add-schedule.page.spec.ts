import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSchedulePage } from './add-schedule.page';

describe('AddSchedulePage', () => {
  let component: AddSchedulePage;
  let fixture: ComponentFixture<AddSchedulePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
