import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Absence} from '../dataAccess/absence';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  readonly backendUrl = 'absence';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Absence[]> {
    return this.http.get<Absence[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Absence> {
    return this.http.get<Absence>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(absence: Absence): Observable<Absence> {
    return this.http.put<Absence>(environment.backendBaseUrl + this.backendUrl + `/edit/${absence.id}`, absence);
  }

  public save(absence: Absence): Observable<Absence> {
    return this.http.post<Absence>(environment.backendBaseUrl + this.backendUrl + `/add`, absence);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/delete/${id}`, {observe: 'response'});
  }
}
