import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup
} from '@angular/forms';
import {DepartmentService} from '../../../../services/department.service';
import {Department} from '../../../../dataAccess/department';
import {MatHint, MatInput} from '@angular/material/input';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-department-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    MatButton,
    NgIf
  ],
  templateUrl: './department-form.component.html',
  styleUrl: './department-form.component.scss'
})
export class DepartmentFormComponent implements OnInit{
  department = new Department()
  edit: boolean = false

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder,
              private departmentService: DepartmentService, private snackBar: MatSnackBar) {
  }

  public objForm = new UntypedFormGroup({
    department_code: new UntypedFormControl(''),
    description: new UntypedFormControl('')
  })

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.edit = true
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string)

      this.departmentService.getOne(id).subscribe(object => {
        this.department = object
        this.objForm = this.formBuilder.group(object)
      })
    } else {
      this.objForm = this.formBuilder.group(this.department)
    }
  }

  async save(formData: any) {
    this.department = Object.assign(formData);

    if (this.department.id) {
      this.departmentService.update(this.department).subscribe({
        next: () => {
          this.snackBar.open("Erfolgreich editiert", 'Schliessen', {duration: 5000});
          this.router.navigate(['department']);
        },
        error: () => {
          this.snackBar.open("Konnte Änderungen nicht speichern", "Schliessen", {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.departmentService.save(this.department).subscribe({
        next: () => {
          this.snackBar.open("Erfolgreich hinzugefügt", "Schliessen", {duration: 5000});
          this.router.navigate(['department']);
        },
        error: () => {
          this.snackBar.open("Konnte nicht hinzugefügt werden", "Schliessen", {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}
