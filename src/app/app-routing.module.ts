import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: 'layout',
        loadChildren: () => import('./component/layout.module').then(m => m.LayoutModule),
      },
      {
        path: 'login',
        loadChildren: () => import('./component/auth/auth.module').then(m => m.AuthModule)
      }
    ],
    data: {
      breadcrumb: 'Home',
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
