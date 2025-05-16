import { TestBed } from '@angular/core/testing';

import { AbsenceService } from './absence.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {createSpyFromClass, Spy} from 'jasmine-auto-spies';
import {Absence} from '../dataAccess/absence';
describe('AbsenceService', () => {
  let service: AbsenceService;
  let httpSpy: Spy<HttpClient>;

  const fakeAbsences: Absence[] = [
    {
      id: 1,
      employee: {
        id: 1,
        first_name: "Leon",
        last_name: "Schaub",
        department: {
          id: 1,
          department_code: "DEV",
          description: "The Developer Department"
        }
      },
      from_date: new Date("2025-01-01"),
      to_date: new Date("2025-01-01"),
      description: "War krank",
      absenceReason: {
        id: 1,
        absence_reason: "Krank"
      }
    },
    {
      id: 2,
      employee: {
        id: 2,
        first_name: "Juan",
        last_name: "Luethy",
        department: {
          id: 2,
          department_code: "GL",
          description: "The Company Lead"
        }
      },
      from_date: new Date("2025-02-02"),
      to_date: new Date("2025-04-04"),
      description: "Bin in den Ferien",
      absenceReason: {
        id: 2,
        absence_reason: "Ferien"
      }
    }
  ]
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: createSpyFromClass(HttpClient)}
      ],
      teardown: {destroyAfterEach: true}
    });
    service = TestBed.inject(AbsenceService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of absences', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeAbsences);

    service.getList().subscribe({
      next: absences => {
        expect(absences).toHaveSize(fakeAbsences.length);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should create a new absence', (done: DoneFn) => {
    const newAbsence: Absence = {
      id: 3,
      employee: {
        id: 3,
        first_name: "Timeon",
        last_name: "Haas",
        department: {
        id: 3,
          department_code: "ACC",
          description: "The Accounting Department"
        }
      },
      from_date: new Date("2025-02-04"),
      to_date: new Date("2025-03-04"),
      description: "Militärdienst",
      absenceReason: {
        id: 3,
        absence_reason: "Militärdienst"
      }
    };

    httpSpy.post.and.nextWith(newAbsence);

    service.save(newAbsence).subscribe({
      next: absence => {
        expect(absence).toEqual(newAbsence);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.post.calls.count()).toBe(1)
  });

  it('should update an absence', (done: DoneFn) => {

    const absence = fakeAbsences[0];
    absence.description = 'Updated Description';

    httpSpy.put.and.nextWith(absence);

    service.update(absence).subscribe({
      next: absence => {
        expect(absence.description).toEqual('Updated Description');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.put.calls.count()).toBe(1)
  });

  it('should delete an existing absence', (done: DoneFn) => {

    httpSpy.delete.and.nextWith(new HttpResponse({
      status: 200
    }));

    service.delete(1).subscribe({
      next: response => {
        expect(response.status).toBe(200);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.delete.calls.count()).toBe(1);
  });
});
