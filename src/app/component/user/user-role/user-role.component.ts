import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuRoles } from '../../../core/models/menuRoles.class';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { RoleService } from '../../role/role.service';
import { UserService } from '../user.service';
import { User } from '../../../core/models/user.class';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

  @Input() user: User;
  @Input() isVisibleRole: boolean;
  @Input() titleModelRole: string;
  @Input() defaultCheckedKeys: string[];  
  @Input() nodes: MenuRoles[] = [];
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  checkedKeys: any[] = [];
  
  searchTextRoles = '';
  constructor(private roleService: RoleService, private userSevice: UserService) { }

  ngOnInit(): void {        
    this.userSevice.getUserRoles(this.user.userName).subscribe(res => {      
      if(res != undefined && res != null && res.length > 0) {        
        var arrayString: string[] = [];
        for(var i = 0 ; i < res.length; i++) {
          arrayString.push(res[i] + "");
        }
        console.log(arrayString);
        this.defaultCheckedKeys = arrayString;
      }
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {    
    if(event.eventName == 'check') {
      console.log(event.checkedKeys);
      this.checkedKeys = [];
      for(var node of event.checkedKeys) {        
        this.checkedKeys.push(node.key);
      }
      console.log(this.checkedKeys);
    }
  }

  handleCancelRole(): void {
    this.isVisibleRole = false;
    this.cancel.emit(this.isVisibleRole);
  }
  handleOkRole(): void {
    this.userSevice.setUserRoles(this.user.userId, this.checkedKeys).subscribe(res => {
      this.isVisibleRole = false;    
      this.cancel.emit(this.isVisibleRole);
    });    
  }  

}




