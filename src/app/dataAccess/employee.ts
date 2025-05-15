import {Department} from './department';

export class Employee {
  public id!: number;
  public first_name = '';
  public last_name = '';
  public department: Department = new Department();
}
