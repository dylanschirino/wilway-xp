import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  /*
  *
  * Get Projects method -> Return an object json with projects data
  *
  */
  AllProjects(): Observable<Project[]> {
    return this.http
    .get<Project[]>( this.baseURL + 'allprojects', httpOptions )
    .pipe(
      tap(
        _ => this.log('fetched projects')
      ),
      catchError(
        this.handleError('getProjects', [])
      )
    );
  }

  /*
  *
  * Get Towns method -> Return an object json with towns data
  *
  */
  AllTowns(): Observable<Town[]> {
    return this.http
    .get<Town[]>( this.baseURL + 'alltowns', httpOptions )
    .pipe(
      tap(
        _ => this.log('fetched towns')
      ),
      catchError(
        this.handleError('getTowns', [])
      )
    );
  }

  /*
  *
  * Get Config method -> Return an object json with config data
  *
  */
  getConfig(): Observable<Config[]> {
    return this.http
    .get<Config[]>( this.baseURL + 'config', httpOptions )
    .pipe(
      tap(
        _ => this.log('fetched config')
      ),
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
