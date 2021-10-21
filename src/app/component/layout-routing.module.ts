import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { ActionComponent } from './action/action.component';
import { ViewEntityComponent } from "./entity/view-entity/view-entity.component";
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: {
          pagename: 'users_page_name',
          breadcrumb: 'Users'
        }
      },
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.RoleModule),
        data: {
          pagename: 'roles_page_name',
          breadcrumb: 'Roles'
        }
      },
      {
        path: 'group',
        loadChildren: () => import('./group/group.module').then(m => m.GroupModule),
        data: {
          pagename: 'groups_page_name',
          breadcrumb: 'Groups'
        }
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule),
        data: {
          pagename: 'menus_page_name',
          breadcrumb: 'Menus'
        }
      },
      {
        path: 'action',
        component: ActionComponent,
        data: {
          pagename: 'actions_page_name',
          breadcrumb: 'Actions'
        },
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
        data: {
          pagename: 'welcome',
          breadcrumb: 'Welcome'
        }
      },
      {
        path: 'entities',
        component: ViewEntityComponent,
        data: {
          pagename: 'page_name.entity',
          breadcrumb: 'Entities'
        }
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
