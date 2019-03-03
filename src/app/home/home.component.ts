import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Project } from '../project';
import { WilwayService } from '../wilway.service';
import { Town } from '../town';
import { Config } from '../config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Variables initialization
  projects: any = [] ;
  themes: Config[] = [];
  towns: Town[] = [] ;
  displayedColumns: string[] = ['name', 'townTitle', 'themes', 'startdate', 'stopdate', 'progression', 'id'];
  townFilter: any = { name: '' };
  themeFilter: any = { name: '' };

  constructor( private data: WilwayService, private spinner: NgxSpinnerService ) {
  }

  ngOnInit() {
     this.spinner.show();
     this.getTowns();
     this.getThemes();
     this.getProjects();
  }

  /*
  * Return value: Array with object of projects
  */
  getProjects() {
    this.projects = [];
    this.data.AllProjects().subscribe((datas: {}) => {
      this.projects = datas;
      this.spinner.hide();
    });
  }

  /*
  * Return value: Array with object of themes
  */
  getThemes(): void {
    this.data.getConfig()
      .subscribe( ( themes: any ) => {
        this.themes = themes.response.Themes.filter(this.onlyUnique);
      } );
  }

  /*
  * Return value: Array with object of town
  */
  getTowns(): void {
    this.data.AllTowns()
      .subscribe( (towns: any ) => {
        this.towns = towns.response.filter(this.onlyUnique);
      }
    );
  }

  /*
  * Return value: String with number of days elapsed from today since stardate
  */
  getProgression(stop, start): string {
    if ( start != null && stop != null ) {
      const startDate = moment(start);
      const stopDate =  moment( new Date() );
      const progression = stopDate.diff(startDate, 'days') ;
      return progression + ' jours écoulés';
    }
  }

  /*
  * Small helper to remove doublon in array
  */
  onlyUnique(value, index, self): any {
    return self.indexOf(value) === index;
  }
  
  /*
  * Small helper to check if it's an array
  */
  isArray(obj: any ) {
    return Array.isArray(obj);
  }
}
