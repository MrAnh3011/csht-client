import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthorizedComponent } from './authorized/authorized.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/share/share.module';
import {StoreModule} from '@ngrx/store';

@NgModule({
  declarations: [
    LoginComponent,
    AuthorizedComponent,
    PageNotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    ShareModule,
  ],
  providers: [AuthService]

})
export class AuthModule {
}
