import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Technique } from 'src/app/core/models/technique.interface';
import { TechniquesService } from 'src/app/core/services/techniques.service';

@Component({
  selector: 'app-new-technique',
  templateUrl: './new-technique.component.html',
  styleUrls: ['./new-technique.component.scss']
})
export class NewTechniqueComponent implements OnInit {

  techniqueForm!: FormGroup;
  newTechnique$!: Observable<Technique>;
  heroId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private techniquesService: TechniquesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.heroId = +this.route.snapshot.params['id'];

    this.techniqueForm = this.formBuilder.group({
      name: [null, Validators.required],
      heroId: [this.heroId]
    }, {
      updateOn: 'blur'
    });
    this.newTechnique$ = this.techniqueForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        id: 0
      }))
    )
  }

  onSubmitTechniqueForm(): void {
    this.techniquesService.addTechnique$(this.techniqueForm.value).pipe(
      tap(() => this.router.navigateByUrl(`heroes/${this.heroId}`))
    ).subscribe();
  }

}
