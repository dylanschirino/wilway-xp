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

  getTown(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.data.AllTowns()
      .subscribe( (towns: any ) => {
        const town = towns.response.filter( obj => {
          return obj.name === name;
        });
        this.town = town[0];
      }
    );
  }

}
