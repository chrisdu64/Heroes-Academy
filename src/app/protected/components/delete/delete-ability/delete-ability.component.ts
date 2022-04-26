import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ability } from 'src/app/core/models/ability.interface';
import { AbilitiesService } from 'src/app/core/services/abilities.service';
import { selectAbilities, selectAbilitiesByHeroId } from 'src/app/store/selectors/ability.selectors';

@Component({
  selector: 'app-delete-ability',
  templateUrl: './delete-ability.component.html',
  styleUrls: ['./delete-ability.component.scss']
})
export class DeleteAbilityComponent implements OnInit {

  heroId!: number;
  abilities$!: Observable<Ability[]>;

  constructor(
    private route: ActivatedRoute,
    private abilitiesService: AbilitiesService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.heroId = +this.route.snapshot.params['id'];

    this.abilities$ = this.store.select(selectAbilitiesByHeroId(this.heroId))
  }

  onDeleteAbility(id: number): void {
    this.abilitiesService.deleteAbility$(id).subscribe(() => this.router.navigateByUrl(`/protected/heroes/${this.heroId}`))

  }

}
