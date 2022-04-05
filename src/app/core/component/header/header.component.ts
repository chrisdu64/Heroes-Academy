import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
      }
    })
  }

  search(): void {
    if (this.searchTerm)
      this.router.navigateByUrl('/protected/heroes/search/' + this.searchTerm);
    else this.router.navigateByUrl('/protected/heroes')
  }

}
