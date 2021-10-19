import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UserViewComponent } from './user-view/user-view.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from '../user/user.service';
import { ShareModule } from '../../share/share.module';
import { DatePipe } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserImportComponent } from './user-import/user-import.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
    declarations: [
        UserViewComponent,
        UserProfileComponent,
        UserImportComponent,
        UserAddComponent,
        UserRoleComponent,
        UserUpdateComponent
    ],
    imports: [
        UserRoutingModule,
        ShareModule,
    ],
    providers: [UserService, DatePipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class UserModule {

}
