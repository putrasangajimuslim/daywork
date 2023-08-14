import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordAttendancePage } from './record-attendance.page';

describe('RecordAttendancePage', () => {
  let component: RecordAttendancePage;
  let fixture: ComponentFixture<RecordAttendancePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecordAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
