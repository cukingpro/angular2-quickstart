/**
 * Created by KING on 7/3/2016.
 */
import {Injectable} from '@angular/core';
import {HEROES} from './mock-heroes'
import {Hero} from "./hero";

@Injectable()
export class HeroService {

  getHeroes() {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(() => resolve(HEROES), 5000) // 2 seconds
    );
  }
}
