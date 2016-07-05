import {Component, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';
import {Hero} from './hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html'
})
export class HeroDetailComponent implements OnDestroy, OnInit {

  @Input() hero:Hero;
  @Output() close = new EventEmitter();
  error:any;
  sub:any;
  navigated = false; // true if navigated here

  constructor(private heroService:HeroService,
              private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id)
          .then(hero => this.hero = hero);
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // goBack() {
  //   window.history.back();
  // }

  goBack(savedHero: Hero = null) {
    this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }

  save() {
    this.heroService
      .save(this.hero)
      .then(hero => {
        this.hero = hero; // saved hero, with id if new
        this.goBack(hero);
      })
      .catch(error => this.error = error); // TODO: Display error message
  }
}
