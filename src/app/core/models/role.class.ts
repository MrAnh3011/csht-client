import {Action} from './action.model';
import {EntityDto} from "./entity.class";

export interface Role {
  roleId: string;
  description?: string;
  createdDate?: Date;
  actionId?: string;
  entityId?: string;
  actionResponses?: Action;
  actionDto?: Action;
  entityDto?: EntityDto;
  status: number;
}

export class Pagination {
  page: number;
  pageSize: number;
}

