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
  loading = true;

  constructor( private data: WilwayService, private spinner: NgxSpinnerService ) {
  }

  ngOnInit() {
     this.spinner.show();
     this.getTowns();
     this.getThemes();
     this.getProjects();
  }

  getProjects() {
    this.projects = [];
    this.data.AllProjects().subscribe((datas: {}) => {
      this.projects = datas;
      this.spinner.hide();
    });
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
      return progression + ' jours écoulés';
    }
  }

  onlyUnique(value, index, self): any {
    return self.indexOf(value) === index;
  }

  isArray(obj : any ) {
    return Array.isArray(obj);
 }
}
