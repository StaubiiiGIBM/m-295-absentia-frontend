import {Absence} from '../../../../dataAccess/absence';
import {AbsenceService} from '../../../../services/absence.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppIsInRolesDirective} from "../../../../directives/app-is-in-roles.dir";
import {AppRoles} from '../../../../../app.roles';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-absence-list',
  imports: [
    AppIsInRolesDirective,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './absence-list.component.html',
  styleUrl: './absence-list.component.scss'
})
export class AbsenceListComponent implements OnInit, AfterViewInit{
  absenceDataSource = new MatTableDataSource<Absence>()
  @ViewChild(MatPaginator) paginator?: MatPaginator

  cols = ['id','employee_first_name','employee_last_name','from_date','to_date','absence_reason','description', 'actions']

  public constructor(private absenceService: AbsenceService, private snackBar: MatSnackBar, private router: Router) {
  }

  async ngOnInit() {
    this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.absenceDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.absenceService.getList().subscribe(o => {
      this.absenceDataSource.data = o
    });
  }

  async edit(e: Absence) {
    await this.router.navigate(['absence/edit', e.id]);
  }

  async add() {
    await this.router.navigate(['absence/add']);
  }

  delete(e: Absence) {
    this.absenceService.delete(e.id).subscribe({
      next: response => {
        if (response.status == 200) {
          this.snackBar.open('Erfolgreich gelöscht', 'Schliessen',{duration: 5000})
          this.reloadData()
        } else {
          this.snackBar.open('Diese Absenz konnte nicht gelöscht werden.', 'Schliessen',{duration: 5000})
        }
      },
      error: () => this.snackBar.open('ERROR: Diese Absenz konnte nicht gelöscht werden.', 'Schliessen',{duration: 5000})
    })
  }

  protected readonly AppRoles = AppRoles;
}
