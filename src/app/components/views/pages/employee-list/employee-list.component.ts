import {Component, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Employee} from '../../../../dataAccess/employee';
import {EmployeeService} from '../../../../services/employee.service';
import {AppRoles} from '../../../../../app.roles';
import {AppIsInRolesDirective} from '../../../../directives/app-is-in-roles.dir';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-employee-list',
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
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  employeeDataSource = new MatTableDataSource<Employee>()
  @ViewChild(MatPaginator) paginator?: MatPaginator

  cols = ['id','first_name','last_name','department','actions']

  public constructor(private employeeService: EmployeeService, private snackBar: MatSnackBar, private router: Router) {
  }

  async ngOnInit() {
    this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.employeeDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.employeeService.getList().subscribe(o => {
      this.employeeDataSource.data = o
    });
  }

  async edit(e: Employee) {
    await this.router.navigate(['employee/edit', e.id]);
  }

  async add() {
    await this.router.navigate(['employee/add']);
  }

  delete(e: Employee) {
    this.employeeService.delete(e.id).subscribe({
      next: response => {
        if (response.status == 200) {
          this.snackBar.open('Erfolgreich gelöscht', 'Schliessen',{duration: 5000})
          this.reloadData()
        } else {
          this.snackBar.open('Dieser Mitarbeiter konnte nicht gelöscht werden.', 'Schliessen',{duration: 5000})
        }
      },
      error: () => this.snackBar.open('ERROR: Dieser Mitarbeiter konnte nicht gelöscht werden.', 'Schliessen',{duration: 5000})
    })
  }

  protected readonly AppRoles = AppRoles;
}


