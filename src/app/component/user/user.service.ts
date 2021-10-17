import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';
import { Observable } from 'rxjs';
import { SearchUser } from '../../core/models/searchUser.class';
import { UrlConstant } from '../../share/constants/url.class';

@Injectable()
export class UserService extends BaseService {
    getUser(search: SearchUser): Observable<any> {
        // return this.post( UrlConstant.LIST_USER  , search);
        return this.post(UrlConstant.LIST_USER, search);
    }
    addUser(user: any): Observable<any> {
        return this.post(UrlConstant.ADD_USER, user);
    }
    deleteUser(id: number[]): Observable<any> {
        return this.delete(UrlConstant.DETAIL_USER + '?userId=' + id, null);
    }
    updateUser(user: any): Observable<any> {
        return this.put(UrlConstant.UPDATE_USER, user);
    }
    updateProfile(user: any): Observable<any> {
        return this.put(UrlConstant.UPDATE_PROFILE, user);
    }
    changePassword(user: any): Observable<any> {
        return this.put(UrlConstant.CHANGE_PASSWORD, user);
    }
    getUserByUsername(username: any): Observable<any> {
        return this.get(UrlConstant.DETAIL_USER + '/' + username);
    }

    getUsersListReport(data: any) {
        return this.post(UrlConstant.DETAIL_USER + '/reportUser', data, {}, 'blob');
    }
    uploadAvatar(FormData: any): Observable<any> {
        return this.post(UrlConstant.UPLOAD_AVATAR, FormData);
    }
    getBusinessUnitByUser(userId: any) {
        return this.get(UrlConstant.BUSINESS_UNIT + '?userId=' + userId);
    }
    readSheetsExel(dataFile: any) {
        return this.post(UrlConstant.USER_READ_SHEETS, dataFile);
    }
    getRolesPartner() {
        return this.get(UrlConstant.USER_ROLES_PARTNER);
    }
    getRolesBss() {
        return this.get(UrlConstant.LIST_ROLE);
    }
    getUserRoles(userName: any) {
        return this.post(UrlConstant.DETAIL_USER + "/getUsersRole", userName);
    }
    setUserRoles(userId: any, roles: any) {
        return this.post(UrlConstant.DETAIL_USER + "/setUsersRole", { userId: userId, roles: roles });
    }
    setValidateImport(index: any, formData: any, roles: any, type: any) {
        return this.post(UrlConstant.USER_PARTNER_VALIDATE + '?index=' + index + '&roles=' + roles + '&type=' + type, formData);
    }
    exportFileValidateImport(index: any, formData: any, type: any) {
        return this.post(UrlConstant.USER_VALIDATE_EXPORT_FILE + '?index=' + index + '&type=' + type, formData, {}, 'blob');
    }
    importExcelUser(formData: any, type: any) {
        return this.post(UrlConstant.USER_IMPORT_FILE + '?type=' + type, formData);
    }
    sendTotpCode(username: string) {
        // @ts-ignore
        return this.post(UrlConstant.SEND_TOTP_CODE, username);
    }
}
