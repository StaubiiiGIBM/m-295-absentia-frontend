import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AbsenceReason} from '../../../../dataAccess/absence-reason';
import {AbsenceReasonService} from '../../../../services/absence-reason.service';
import {MatButton} from '@angular/material/button';
import {MatHint, MatInput, MatLabel} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatFormField} from '@angular/material/form-field';

@Component({
  selector: 'app-absence-reason-form',
  imports: [
    MatButton,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './absence-reason-form.component.html',
  styleUrl: './absence-reason-form.component.scss'
})
export class AbsenceReasonFormComponent implements OnInit{
  absenceReason = new AbsenceReason()
  edit: boolean = false

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder,
              private absenceReasonService: AbsenceReasonService, private snackBar: MatSnackBar) {
  }

  public objForm = new UntypedFormGroup({
    absence_reason: new UntypedFormControl('')
  })

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.edit = true
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string)

      this.absenceReasonService.getOne(id).subscribe(object => {
        this.absenceReason = object
        this.objForm = this.formBuilder.group(object)
      })
    } else {
      this.objForm = this.formBuilder.group(this.absenceReason)
    }
  }

  async save(formData: any) {
    this.absenceReason = Object.assign(formData);

    if (this.absenceReason.id) {
      this.absenceReasonService.update(this.absenceReason).subscribe({
        next: () => {
          this.snackBar.open("Erfolgreich editiert", 'Schliessen', {duration: 5000});
          this.router.navigate(['absenceReason']);
        },
        error: () => {
          this.snackBar.open("Konnte Änderungen nicht speichern", "Schliessen", {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.absenceReasonService.save(this.absenceReason).subscribe({
        next: () => {
          this.snackBar.open("Erfolgreich hinzugefügt", "Schliessen", {duration: 5000});
          this.router.navigate(['absenceReason']);
        },
        error: () => {
          this.snackBar.open("Konnte nicht hinzugefügt werden", "Schliessen", {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}

