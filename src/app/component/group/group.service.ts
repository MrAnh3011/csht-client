import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';
import { Observable } from 'rxjs';
import { Group } from '../../core/models/group.class';
import { UrlConstant } from '../../share/constants/url.class';
import { Constant } from '../../share/constants/constant.class';

@Injectable()
export class GroupService extends BaseService {
  /* getGroup(pageNum: number, pageSize: number) {
    return this.get( UrlConstant.LIST_GROUP + '/listGroup?pageSize=' + pageSize + '&pageNum=' + pageNum );
  } */

  getGroup(searchStr: string) {
    return this.post(UrlConstant.LIST_GROUP + '/filter', { name: searchStr, status: Constant.RECORD.STATUS.FILTER_ALL });
  }

  deleteGroup(id: number[]): Observable<number> {
    return this.delete(UrlConstant.LIST_GROUP + '?id=' + id, null);
  }

  addGroup(group: Group): Observable<Group> {
    return this.post(UrlConstant.LIST_GROUP, group);
  }

  updateGroup(group: Group): Observable<Group> {
    return this.put(UrlConstant.LIST_GROUP, group);
  }

  setGroupRoles(groupId: number, roles: any) {
    return this.post(UrlConstant.LIST_GROUP + "/setGroupsRole", { groupId: groupId, roles: roles });
  }

  getGroupsListReport(data: any) {
    return this.post(UrlConstant.LIST_GROUP + '/reportGroup', data, {}, 'blob');
  }
  getGroups(data: any): Observable<any> {
    return this.post(UrlConstant.LIST_GROUP + "/filter", data);
  }
}


