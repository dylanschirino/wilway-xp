import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WilwayService } from '../wilway.service';
import { Town } from '../town';

@Component({
  selector: 'app-town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.scss']
})
export class TownComponent implements OnInit {
  towns: Town[] = [] ;
  town: Town[] = [] ;
  constructor(
    private route: ActivatedRoute,
    private data: WilwayService,
    private location: Location) { }

  ngOnInit(): void {
    this.getTown();
  }

  /*
  *
  * Get Town function -> Get town in name match url
  *
  */
  getTown(): void {
    let name = this.route.snapshot.paramMap.get('name');
    name = name.replace(/\s/g, '');
    this.data.AllTowns()
      .subscribe( (towns: any ) => {
        const town = towns.response.filter( obj => {
          obj.title = obj.title.replace(/\s/g, '');
          return obj.title.toLowerCase() === name;
        });
        this.town = town[0];
      }
    );
  }

  /*
  *
  * Go Back function -> Helper to get back to previous visited page
  *
  */
  goBack(): void {
    this.location.back();
  }
}
