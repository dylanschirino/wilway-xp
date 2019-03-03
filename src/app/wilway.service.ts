import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Project } from './project';
import { Town } from './town';
import { Config } from './config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class WilwayService {

  private baseURL = 'https://api.wilway.be/api/public/';

  constructor( private http: HttpClient, private messageService: MessageService ) { }
  private log(message: string) {
    this.messageService.add(`WilwayService: ${message}`);
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  /*
  *
  * Get Projects function -> Return an object json with projects data
  *
  */
  AllProjects(): Observable<any> {
    return this.http
    .get( this.baseURL + 'allprojects', httpOptions )
    .pipe(
      map( this.extractData ),
      catchError(
        this.handleError('getProjects', [])
      )
    );
  }

  /*
  *
  * Get Towns function -> Return an object json with towns data
  *
  */
  AllTowns(): Observable<any> {
    return this.http
    .get( this.baseURL + 'alltowns', httpOptions )
    .pipe(
      map( this.extractData ),
      catchError(
        this.handleError('getTowns', [])
      )
    );
  }

  /*
  *
  * Get Config function -> Return an object json with config data
  *
  */
  getConfig(): Observable<any> {
    return this.http
    .get( this.baseURL + 'config', httpOptions )
    .pipe(
      map( this.extractData ),
      catchError(
        this.handleError('getconfig', [])
      )
    );
  }

  // Helper for handling errors
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}
