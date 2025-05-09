import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {Department} from '../../../../dataAccess/department';
import {MatPaginator} from '@angular/material/paginator';
import {DepartmentService} from '../../../../services/department.service';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import { AppIsInRolesDirective } from '../../../../directives/app-is-in-roles.dir';
import {AppRoles} from '../../../../../app.roles';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-department-list',
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
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss'
})
export class DepartmentListComponent implements OnInit, AfterViewInit{
  departmentDataSource = new MatTableDataSource<Department>()
  @ViewChild(MatPaginator) paginator?: MatPaginator

  cols = ['id','department_code','description', 'actions']

  public constructor(private departmentService: DepartmentService, private snackBar: MatSnackBar, private router: Router) {
  }

  async ngOnInit() {
    this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.departmentDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.departmentService.getList().subscribe(o => {
      this.departmentDataSource.data = o
    });
  }

  async edit(e: Department) {
    await this.router.navigate(['department/edit', e.id]);
  }

  async add() {
    await this.router.navigate(['department/add']);
  }

  delete(e: Department) {
    this.departmentService.delete(e.id).subscribe({
      next: response => {
        if (response.status == 200) {
          this.snackBar.open('Erfolgreich gelöscht', 'Schliessen',{duration: 5000})
          this.reloadData()
        } else {
          this.snackBar.open('Diese Abteilung konnte nicht gelöscht werden.', 'Schliessen',{duration: 5000})
        }
      },
      error: () => this.snackBar.open('ERROR: Diese Abteilung konnte nicht gelöscht werden.', 'Schliessen',{duration: 5000})
    })
  }

  protected readonly AppRoles = AppRoles;
}
