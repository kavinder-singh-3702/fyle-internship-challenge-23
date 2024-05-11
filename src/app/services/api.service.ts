import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient
      .get(`https://api.github.com/users/${githubUsername}`)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  getRepos(githubUsername: string, pageSize: number): Observable<any[]> {
    return this.httpClient
      .get<any[]>(
        `https://api.github.com/users/${githubUsername}/repos?per_page=${pageSize}&sort=updated`
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
