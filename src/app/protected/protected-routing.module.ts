import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProtectedComponent } from "./protected.component";

const routes: Routes = [
    {
        path: '',
        component: ProtectedComponent,
        children: [
            { path: 'delete', loadChildren: () => import('./components/delete/delete.module').then(m => m.DeleteModule) },
            { path: 'heroes', loadChildren: () => import('./components/heroes/heroes.module').then(m => m.HeroesModule) },
            { path: 'create', loadChildren: () => import('./components/new/new.module').then(m => m.NewModule) },
            { path: '', redirectTo: 'heroes', pathMatch: 'full' },
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProtectedRoutingModule { }