import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeroDto } from 'src/app/core/models/heroDto.interface';
import { selectHeroesDto, selectHeroesDtoBySearchTerm } from 'src/app/store/selectors/hero-dto.selectors';
@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit {

  heroesDto$!: Observable<HeroDto[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {

      if (params['searchTerm']) {
        this.heroesDto$ = this.store.select(selectHeroesDtoBySearchTerm(params['searchTerm']))
        console.log(selectHeroesDtoBySearchTerm(params['searchTerm']));

      } else this.heroesDto$ = this.store.select(selectHeroesDto)
    });
  }

}


