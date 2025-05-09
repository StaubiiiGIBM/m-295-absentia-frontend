import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceReasonListComponent } from './absence-reason-list.component';

describe('AbsenceReasonListComponent', () => {
  let component: AbsenceReasonListComponent;
  let fixture: ComponentFixture<AbsenceReasonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenceReasonListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceReasonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
