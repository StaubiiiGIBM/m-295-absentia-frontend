import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceReasonFormComponent } from './absence-reason-form.component';

describe('AbsenceReasonFormComponent', () => {
  let component: AbsenceReasonFormComponent;
  let fixture: ComponentFixture<AbsenceReasonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenceReasonFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceReasonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
