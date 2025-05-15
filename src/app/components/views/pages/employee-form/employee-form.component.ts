import {Component, OnInit} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup
} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatHint, MatInput, MatLabel} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {Department} from '../../../../dataAccess/department';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EmployeeService} from '../../../../services/employee.service';
import {Employee} from '../../../../dataAccess/employee';
import {MatFormField} from '@angular/material/form-field';
import {DepartmentService} from '../../../../services/department.service';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'app-employee-form',
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit{
  employee = new Employee()
  departments: Department[] = [];

  edit = false

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder,
              private employeeService: EmployeeService, private snackBar: MatSnackBar, private departmentService: DepartmentService) {
  }

  public objForm = new UntypedFormGroup({
    first_name: new UntypedFormControl(''),
    last_name: new UntypedFormControl(''),
    departmentId: new UntypedFormControl('')
  })

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.edit = true
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string)

      this.employeeService.getOne(id).subscribe(object => {
        this.employee = object
        this.objForm = this.formBuilder.group(object)
        this.objForm.addControl('departmentId', new UntypedFormControl(object.department.id));
      });
    }
    this.departmentService.getList().subscribe(object => {
      this.departments = object;
    });
  }

  async save(formData: any) {
    this.employee = Object.assign(formData);

    this.employee.department = this.departments.find(o => o.id === formData.departmentId) as Department;

    if (this.employee.id) {
      this.employeeService.update(this.employee).subscribe({
        next: () => {
          this.snackBar.open("Erfolgreich editiert", 'Schliessen', {duration: 5000});
          this.router.navigate(['employee']);
        },
        error: () => {
          this.snackBar.open("Konnte Änderungen nicht speichern", "Schliessen", {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.employeeService.save(this.employee).subscribe({
        next: () => {
          this.snackBar.open("Erfolgreich hinzugefügt", "Schliessen", {duration: 5000});
          this.router.navigate(['employee']);
        },
        error: () => {
          this.snackBar.open("Konnte nicht hinzugefügt werden", "Schliessen", {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}

