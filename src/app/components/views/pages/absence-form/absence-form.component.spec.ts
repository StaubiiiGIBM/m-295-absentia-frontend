import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceFormComponent } from './absence-form.component';
import {MatSelectModule} from '@angular/material/select';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {AppRoutingModule} from '../../../../app-routing.module';
import {Absence} from '../../../../dataAccess/absence';

describe('AbsenceFormComponent', () => {
  let component: AbsenceFormComponent;
  let fixture: ComponentFixture<AbsenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSelectModule,
        MatMomentDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        AbsenceFormComponent,
        AppRoutingModule,
      ],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
      teardown: {destroyAfterEach: true}
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save a new Absence', () => {
    const newAbsence :Absence = {
      id: 1,
      employee: {
        id: 1,
        first_name: "Leon",
        last_name: "Schaub",
        department: {
          id: 1,
          department_code: "DEV",
          description: "The Developer Department"
        }
      },
      from_date: new Date("2025-01-01"),
      to_date: new Date("2025-01-01"),
      description: "War krank",
      absenceReason: {
        id: 1,
        absence_reason: "Krank"
      }
    }
    const spySave = spyOn(component, 'save');

    component.save(newAbsence);

    expect(spySave).toHaveBeenCalled();
  })
});
