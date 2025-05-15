import {Component, OnInit} from '@angular/core';
import {Employee} from '../../../../dataAccess/employee';
import {ActivatedRoute, Router} from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup
} from '@angular/forms';
import {EmployeeService} from '../../../../services/employee.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Absence} from '../../../../dataAccess/absence';
import {AbsenceReason} from '../../../../dataAccess/absence-reason';
import {AbsenceReasonService} from '../../../../services/absence-reason.service';
import {AbsenceService} from '../../../../services/absence.service';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatHint, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {NgForOf, NgIf} from '@angular/common';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-absence-form',
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatFormField,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
  ],
  templateUrl: './absence-form.component.html',
  styleUrl: './absence-form.component.scss'
})
export class AbsenceFormComponent implements OnInit{
  absence = new Absence()
  employees: Employee[] = [];
  absenceReasons: AbsenceReason[] = [];

  edit: boolean = false

  public objForm = new UntypedFormGroup({
    employeeId: new UntypedFormControl(''),
    from_date: new UntypedFormControl(''),
    to_date: new UntypedFormControl(''),
    description: new UntypedFormControl(''),
    absenceReasonId: new UntypedFormControl('')
  })

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder, private absenceService: AbsenceService,
              private employeeService: EmployeeService, private snackBar: MatSnackBar, private absenceReasonService: AbsenceReasonService) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.edit = true
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string)

      this.absenceService.getOne(id).subscribe(object => {
        this.absence = object
        this.objForm = this.formBuilder.group(object)
        this.objForm.addControl('employeeId', new UntypedFormControl(object.employee.id));
        this.objForm.addControl('absenceReasonId', new UntypedFormControl(object.absenceReason.id));
      });
    }

    this.employeeService.getList().subscribe(object => {
      this.employees = object;
    });
    this.absenceReasonService.getList().subscribe(object => {
      this.absenceReasons = object;
    })
  }

  async save(formData: any) {
    this.absence = Object.assign(formData);

    this.absence.employee = this.employees.find(o => o.id === formData.employeeId) as Employee;
    this.absence.absenceReason = this.absenceReasons.find(o => o.id === formData.absenceReasonId) as AbsenceReason;

    if (this.absence.id) {
      this.absenceService.update(this.absence).subscribe({
        next: () => {
          this.snackBar.open("Erfolgreich editiert", 'Schliessen', {duration: 5000});
          this.router.navigate(['absence']);
        },
        error: () => {
          this.snackBar.open("Konnte Änderungen nicht speichern", "Schliessen", {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.absenceService.save(this.absence).subscribe({
        next: () => {
          this.snackBar.open("Erfolgreich hinzugefügt", "Schliessen", {duration: 5000});
          this.router.navigate(['absence']);
        },
        error: () => {
          this.snackBar.open("Konnte nicht hinzugefügt werden", "Schliessen", {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}
