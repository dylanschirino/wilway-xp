import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import { FilterPipe } from 'ngx-filter-pipe';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';


import { Project } from '../project';
import { WilwayService } from '../wilway.service';
import { Town } from '../town';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects: Project[] = [] ;
  themes: Project[] = [] ;
  towns: Town[] = [] ;


  townFilter: any = { name: '' };
  autocompleteFilter: any = { name: '' };

  constructor( private data: WilwayService) {
  }

  ngOnInit() {
    this.getProjects();
    this.getTowns();
    this.getThemes();
  }

  getProjects(): void {
    this.data.AllProjects()
      .subscribe( (projects: any ) => {
        this.projects = projects.response;
      }
    );
  }

  getThemes(): void {
    let arrayTheme: any = [];
    let arrayThemeName: any = [];
    this.data.AllProjects()
      .subscribe( (themes: any ) => {
        this.themes = themes.response;
        this.themes.forEach(element => {
          arrayTheme.push(element.themes);
        });
        console.log(arrayTheme);

      }
    );
  }

  getTowns(): void {
    this.data.AllTowns()
      .subscribe( (towns: any ) => {
        this.towns = towns.response;
      }
    );
  }


  getProgression(stop, start): number {
    if ( start != null && stop != null ) {
      const startDate = moment(start);
      const stopDate =  moment( new Date() );
      const progression = stopDate.diff(startDate, 'days') ;
      return progression;
    }
  }


}
