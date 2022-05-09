import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ability } from 'src/app/core/models/ability.interface';
import { updateAbility } from 'src/app/store/actions/ability.actions';
import { selectAbilitiesByIdForUpdate } from 'src/app/store/selectors/ability.selectors';

@Component({
  selector: 'app-update-ability',
  templateUrl: './update-ability.component.html',
  styleUrls: ['./update-ability.component.scss']
})
export class UpdateAbilityComponent implements OnInit {

  abilityId!: number;
  updatedAbilityForm!: FormGroup;
  updatedForm$!: Observable<FormGroup>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.abilityId = +this.route.snapshot.params['id'];

    this.updatedForm$ = this.store.select(selectAbilitiesByIdForUpdate(this.abilityId)).pipe(
      map(ability => this.updatedAbilityForm = this.fb.group({
        name: [ability?.name, Validators.required],
        id: this.abilityId,
        heroId: ability?.heroId
      }, {
        updateOn: 'blur'
      }))
    )
  }

  onSubmitUpdatedAbilityForm() {
    let updatedAbility: Ability = {
      name: this.updatedAbilityForm.value.name,
      id: this.updatedAbilityForm.value.id,
      heroId: this.updatedAbilityForm.value.heroId
    };

    this.store.dispatch(updateAbility({ updatedAbility }));
    this.router.navigateByUrl(`protected/heroes/${updatedAbility.heroId}`);
  }
}
