import {Employee} from './employee';
import {AbsenceReason} from './absence-reason';

export class Absence {
  public id!: number;
  public employee: Employee = new Employee();
  public from_date: string = '';
  public to_date: string = '';
  public absence_reason: AbsenceReason = new AbsenceReason()
}
