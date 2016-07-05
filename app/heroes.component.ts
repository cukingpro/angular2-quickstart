import {Component, OnInit} from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {Router} from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
  directives: [],
  providers: []
})
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes:Hero[];
  selectedHero:Hero;

  constructor(
    private heroService:HeroService,
    private router: Router
  ) {
  }

  onSelect(hero:Hero) {
    this.selectedHero = hero;
  }

  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

}
