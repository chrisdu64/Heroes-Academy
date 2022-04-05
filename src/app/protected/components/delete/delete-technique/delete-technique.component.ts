import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Technique } from 'src/app/core/models/technique.interface';
import { TechniquesService } from 'src/app/core/services/techniques.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-technique',
  templateUrl: './delete-technique.component.html',
  styleUrls: ['./delete-technique.component.scss']
})
export class DeleteTechniqueComponent implements OnInit {
  heroId!: number;
  techniques$!: Observable<Technique[]>;


  constructor(
    private techniquesServices: TechniquesService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.heroId = +this.route.snapshot.params['id'];

    this.techniques$ = this.techniquesServices.getTechniques$().pipe(
      map(techniques => techniques.filter(
        technique => technique.heroId === this.heroId
      ))
    );
  }
  onDeleteTechnique(id: number): void {
    this.http.delete(environment.apiUrl + `/techniques/${id}`).subscribe(() => this.router.navigateByUrl(`/heroes/${this.heroId}`))

  }


}
