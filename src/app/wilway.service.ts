import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as moment from 'moment';

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

  constructor( private http: HttpClient ) { }

  AllProjects(): Observable<Project[]> {
    return this.http
    .get<Project[]>( this.baseURL + 'allprojects' );
  }

  AllTowns(): Observable<Town[]> {
    return this.http
    .get<Town[]>( this.baseURL + 'alltowns' );
  }

  getConfig(): Observable<Config[]> {
    return this.http
    .get<Config[]>( this.baseURL + 'config' );
  }


}
