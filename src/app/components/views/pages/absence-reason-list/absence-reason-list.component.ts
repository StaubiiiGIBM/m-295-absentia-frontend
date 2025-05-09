import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {AbsenceReason} from '../../../../dataAccess/absence-reason';
import {MatPaginator} from '@angular/material/paginator';
import {AbsenceReasonService} from '../../../../services/absence-reason.service';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import { AppIsInRolesDirective } from '../../../../directives/app-is-in-roles.dir';
import {AppRoles} from '../../../../../app.roles';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-absence-reason-list',
  imports: [
    MatTable,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatIcon,
    MatButton,
    AppIsInRolesDirective,
    MatPaginator
  ],
  templateUrl: './absence-reason-list.component.html',
  styleUrl: './absence-reason-list.component.scss'
})
export class AbsenceReasonListComponent implements OnInit, AfterViewInit{
  absenceReasonDataSource = new MatTableDataSource<AbsenceReason>()
  @ViewChild(MatPaginator) paginator?: MatPaginator

  cols = ['id','absence_reason', 'actions']

  public constructor(private absenceReasonService: AbsenceReasonService, private snackBar: MatSnackBar, private router: Router) {
  }

  async ngOnInit() {
    this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.absenceReasonDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.absenceReasonService.getList().subscribe(o => {
      this.absenceReasonDataSource.data = o
    });
  }

  async edit(e: AbsenceReason) {
    await this.router.navigate(['absenceReason/edit', e.id]);
  }

  async add() {
    await this.router.navigate(['absenceReason/add']);
  }

  delete(e: AbsenceReason) {
    this.absenceReasonService.delete(e.id).subscribe({
      next: response => {
        if (response.status == 200) {
          this.snackBar.open('Erfolgreich gelöscht', 'Schliessen',{duration: 5000})
          this.reloadData()
        } else {
          this.snackBar.open('Dieser Absenzgrund konnte nicht gelöscht werden.', 'Schliessen',{duration: 5000})
        }
      },
      error: () => this.snackBar.open('ERROR: Dieser Absenzgrund konnte nicht gelöscht werden.', 'Schliessen',{duration: 5000})
    })
  }

  protected readonly AppRoles = AppRoles;
}
