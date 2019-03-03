import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { WilwayService } from '../wilway.service';
import { Project } from '../project';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: Project[] = [] ;
  project: Project[] = [] ;

  constructor(
    private route: ActivatedRoute,
    private data: WilwayService,
    private location: Location,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getProject();
  }

  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.data.AllProjects()
      .subscribe( (projects: any ) => {
        const project = projects.response.find( obj => {
          return obj.id == id ;
        });
        this.project = project;
        this.spinner.hide();
      }
    );
  }
}
