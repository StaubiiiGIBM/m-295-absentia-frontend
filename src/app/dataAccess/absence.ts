import {Employee} from './employee';
import {AbsenceReason} from './absence-reason';

export class Absence {
  public id!: number;
  public employee: Employee = new Employee();
  public from_date: Date = new Date();
  public to_date: Date = new Date();
  public description = '';
  public absenceReason: AbsenceReason = new AbsenceReason()
}
