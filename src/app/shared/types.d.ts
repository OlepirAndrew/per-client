export interface IAdmin {
  "id": number,
  "name": string,
  "email": string,
  "password": string,
  "lastLogin": string | null,
  "createdAt": string,
  "updatedAt": string,
}

export interface IPerformer {
  "id": number,
  "name": string,
  "nickname": string,
  "email": string,
  "password": string,
  "lastLogin": string | null,
  "createdAt": string,
  "updatedAt": string,
}

export interface ICommonEntity {
  "id": number,
  "name": string,
  "nickname": string,
  "email": string,
  "password": string,
  "lastLogin": string | null,
  "createdAt": string,
  "updatedAt": string,
}

export interface IPages {
  entities: ICommonEntity[];
  meta: {
    itemCount: number,
  }
}

export interface IAdminPages {
  admins: IAdmin[];
  meta: {
    itemCount: number,
  }
}
