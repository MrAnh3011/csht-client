import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDefaultComponent } from './page-default.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PageDefaultComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageDefaultRoutingModule { }
