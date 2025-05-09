import {Injectable} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from '../dataAccess/department';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly backendUrl = 'department';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Department[]> {
    return this.http.get<Department[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Department> {
    return this.http.get<Department>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(department: Department): Observable<Department> {
    return this.http.put<Department>(environment.backendBaseUrl + this.backendUrl + `/edit/${department.id}`, department);
  }

  public save(department: Department): Observable<Department> {
    return this.http.post<Department>(environment.backendBaseUrl + this.backendUrl + `/add`, department);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/delete/${id}`, {observe: 'response'});
  }
}
