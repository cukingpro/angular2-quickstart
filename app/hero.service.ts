/**
 * Created by KING on 7/3/2016.
 */
import {Injectable} from '@angular/core';
import {HEROES} from './mock-heroes'
import {Hero} from "./hero";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class HeroService {

  private heroesUrl = 'app/heroes';  // URL to web api

  constructor(private http: Http) {

  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
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

  // Add new Hero
  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // update existing Hero
  private put(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`

    return this.http
      .put(url, JSON.stringify(hero), {headers: headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  // Delete hero
  delete(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .delete(url, headers)
      .toPromise()
      .catch(this.handleError);
  }

  save(hero: Hero): Promise<Hero> {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }
}
