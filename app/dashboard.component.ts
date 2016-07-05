import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard.component.html',
    
})
export class DashboardComponent implements OnInit {
    heroes: Hero[];

    constructor(private heroService: HeroService) {}

    ngOnInit() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1,5));
    }
}