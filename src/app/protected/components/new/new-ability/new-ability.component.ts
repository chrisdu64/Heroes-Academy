import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ability } from 'src/app/core/models/ability.interface';
import { addAbility } from 'src/app/store/actions/ability.actions';

@Component({
  selector: 'app-new-ability',
  templateUrl: './new-ability.component.html',
  styleUrls: ['./new-ability.component.scss']
})
export class NewAbilityComponent implements OnInit {

  abilityForm!: FormGroup;
  newAbility$!: Observable<Ability>;
  heroId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.heroId = +this.route.snapshot.params['id'];

    this.abilityForm = this.formBuilder.group({
      name: [null, Validators.required],
      heroId: [this.heroId]
    }, {
      updateOn: 'blur'
    });

    this.newAbility$ = this.abilityForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        id: 0
      }))
    )
  }

  onSubmitAbilityForm(): void {

    let newAbility: Ability = {
      name: this.abilityForm.value.name,
      heroId: this.abilityForm.value.heroId
    };

    this.store.dispatch(addAbility({ newAbility }));
    this.router.navigateByUrl(`protected/heroes/${this.heroId}`);
  }
}
