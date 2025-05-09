import {Department} from './department';

export class Employee {
  public id!: number;
  public first_name: string = '';
  public last_name: string = '';
  public department: Department = new Department();
}
