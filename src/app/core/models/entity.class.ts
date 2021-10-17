import {Role} from "./role.class";
import {FilterClass} from "./filter.class";

export class EntityDto {
  entityId: number;
  name: string;
  nameAscii: string;
  status: number;
  strStatus: string;
  adRoles: Role[];
}

export class EntityAddModel {
  name: string
}

export class EntityUpdateModel {
  id: number;
  status: number;
}

export class EntityFilter extends FilterClass {
  name: string;
  status: number
}
