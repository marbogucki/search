import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly urlAPI = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData<T>(url: string, query?: string): Observable<T[]> {
    let params = new HttpParams();
    params = query ? params.set('q', query) : params;

    return this.http.get<T[]>(`${this.urlAPI}/${url}`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  removeData<T>(url: string, id: number): Observable<T> {
    return this.http.delete<T>(`${this.urlAPI}/${url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    const { error, message, status } = errorResponse;
    const logInfo = error instanceof ErrorEvent ? message : `Backend error: ${status}, - ${message}`;
    console.log(logInfo);
    return throwError('Something bad happened; please try again later.');
  }
}
