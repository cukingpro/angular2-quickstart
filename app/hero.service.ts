/**
 * Created by KING on 7/3/2016.
 */
import {Injectable} from '@angular/core';
import {HEROES} from './mock-heroes'
import {Hero} from "./hero";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class HeroService {

  private heroesUrl = 'app/heroes';  // URL to web api

  constructor(private http: Http) {

  }

  // getHeroes() {
  //   return Promise.resolve(HEROES);
  // }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);

  }

  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(() => resolve(HEROES), 5000) // 2 seconds
    );
  }

  getHero(id: number) {
    return this.getHeroes()
      .then(heroes => heroes.filter(hero => hero.id === id)[0]);
  }
}
