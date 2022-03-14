import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { HeroDto } from 'src/app/core/models/heroDto.interface';
import { HeroesDtoService } from 'src/app/core/services/heroes-dto.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  heroesDto!: HeroDto[] | null;
  heroDto!: HeroDto;
  // sub!: Subscription;

  constructor(
    private heroesDtoService: HeroesDtoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const heroId = +this.route.snapshot.params['id'];
    console.log("le id:", heroId);
    this.heroesDto = this.heroesDtoService.getHeroesDto();

    if (this.heroesDto && heroId) {

      for (let i = 0, hL = this.heroesDto?.length; i < hL; i++) {
        if (this.heroesDto[i].id === heroId) {
          this.heroDto = this.heroesDto[i];
        }
      }
    }

    console.log('this.heroDto', this.heroDto);

    // this.sub = this.hero$.subscribe(hero => this.hero = hero);
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  onReturn() {
    this.router.navigateByUrl('heroes');
  }


}
