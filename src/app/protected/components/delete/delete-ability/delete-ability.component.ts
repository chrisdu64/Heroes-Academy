import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ability } from 'src/app/core/models/ability.interface';
import { deleteAbility } from 'src/app/store/actions/ability.actions';
import { selectAbilitiesByHeroId } from 'src/app/store/selectors/ability.selectors';

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
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.heroId = +this.route.snapshot.params['id'];

    this.abilities$ = this.store.select(selectAbilitiesByHeroId(this.heroId))
  }

  onDeleteAbility(id: number): void {
    if (confirm('Etes-vous sûr de vouloir supprimer cette capacité ?')) {

      this.store.dispatch(deleteAbility({ id }));
      this.router.navigateByUrl(`/protected/heroes/${this.heroId}`)
    }

  }

}
