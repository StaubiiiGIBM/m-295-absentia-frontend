import {Injectable} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbsenceReason} from '../dataAccess/absence-reason';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbsenceReasonService {

  readonly backendUrl = 'absenceReason';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<AbsenceReason[]> {
    return this.http.get<AbsenceReason[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<AbsenceReason> {
    return this.http.get<AbsenceReason>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(absenceReason: AbsenceReason): Observable<AbsenceReason> {
    return this.http.put<AbsenceReason>(environment.backendBaseUrl + this.backendUrl + `/edit/${absenceReason.id}`, absenceReason);
  }

  public save(absenceReason: AbsenceReason): Observable<AbsenceReason> {
    return this.http.post<AbsenceReason>(environment.backendBaseUrl + this.backendUrl + `/add`, absenceReason);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/delete/${id}`, {observe: 'response'});
  }
}
