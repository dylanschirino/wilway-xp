import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';


import { Project } from '../project';
import { WilwayService } from '../wilway.service';
import { Town } from '../town';
import { Config } from '../config';
import { config } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Variables initialization
  projects: Project[] = [] ;
  themes: Config[] = [];
  towns: Town[] = [] ;
  displayedColumns: string[] = ['name', 'townTitle', 'themes', 'startdate', 'stopdate', 'progression'];
  townFilter: any = { name: '' };
  themeFilter: any = { name: '' };
  loading = true;
  private projectsObservable: Observable<any[]>;

  constructor( private data: WilwayService ) {
  }

  ngOnInit() {
     this.getProjects();
     this.getTowns();
     this.getThemes();
  }

  getProjects(): void {
    this.data.AllProjects()
      .subscribe( (projects: any ) => {
        this.projects = projects.response.filter(this.onlyUnique);
      }
    );
  }

  getThemes(): void {
    this.data.getConfig()
      .subscribe( ( themes: any ) => {
        this.themes = themes.response.Themes.filter(this.onlyUnique);
      } );
  }


  getTowns(): void {
    this.data.AllTowns()
      .subscribe( (towns: any ) => {
        this.towns = towns.response.filter(this.onlyUnique);
      }
    );
  }


  getProgression(stop, start): string {
    if ( start != null && stop != null ) {
      const startDate = moment(start);
      const stopDate =  moment( new Date() );
      const progression = stopDate.diff(startDate, 'days') ;
        return progression + 'jours restant';
    }
  }

  onlyUnique(value, index, self): any {
    return self.indexOf(value) === index;
  }

}
