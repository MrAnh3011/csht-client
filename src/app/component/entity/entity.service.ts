import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';
import { Observable } from 'rxjs';
import { UrlConstant } from '../../share/constants/url.class';
import { EntityAddModel, EntityFilter, EntityUpdateModel } from "../../core/models/entity.class";

@Injectable()
export class EntityService extends BaseService {
    private static readonly CONTROLLER_NAME = UrlConstant.CONTROLLER.ENTITY

    filter(entityFilter: EntityFilter) {
        return this.post(EntityService.CONTROLLER_NAME + UrlConstant.COMMON_METHOD.FILTER, entityFilter);
    }

    getActiveEntity() {
        return this.get(EntityService.CONTROLLER_NAME + UrlConstant.COMMON_METHOD.ACTIVE);
    }

    getById(entityId: number) {
        return this.get(EntityService.CONTROLLER_NAME + "/" + entityId);
    }

    add(entityAddModel: EntityAddModel): Observable<any> {
        return this.post(EntityService.CONTROLLER_NAME, entityAddModel);
    }

    deleteEntity(entityId: number): Observable<any> {
        // Khi delete mot ban ghi thi ta update status = -1
        // Don gian chi goi lenh put
        return this.delete(EntityService.CONTROLLER_NAME, entityId);
    }

    updateEntity(entityUpdateModel: EntityUpdateModel): Observable<any> {
        return this.put(EntityService.CONTROLLER_NAME, entityUpdateModel);
    }

}

