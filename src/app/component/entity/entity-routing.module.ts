import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../share/guards/auth.guard';
import { ViewEntityComponent } from "./view-entity/view-entity.component";

const routes: Routes = [
  { path: '', component: ViewEntityComponent, canActivate: [AuthGuard] }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
