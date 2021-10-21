import { Role } from './role.class';

export interface Group {
  groupId: string;
  groupName: string;
  name: string;
  description: string;
  createdDate: Date;
  roles: Role[];
  roleIds: number[];
  applicationId?: number;
  status: number;
}

export class Pagination {
  page: number;
  pageSize: number;
}
