import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddScheduleDatePage } from './add-schedule-date.page';

describe('AddScheduleDatePage', () => {
  let component: AddScheduleDatePage;
  let fixture: ComponentFixture<AddScheduleDatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddScheduleDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
