import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Ability } from 'src/app/core/models/ability.interface';
import { AbilitiesService } from 'src/app/core/services/abilities.service';

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
    private abilitiesService: AbilitiesService,
    private router: Router,
    private route: ActivatedRoute
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
    this.abilitiesService.addAbility$(this.abilityForm.value).pipe(
      tap(() => this.router.navigateByUrl(`heroes/${this.heroId}`))
    ).subscribe();
  }

}
