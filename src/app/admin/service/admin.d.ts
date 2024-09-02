export interface IAdmin {
  "id": number,
  "name": string,
  "email": string,
  "password": string,
  "lastLogin": string | null,
  "createdAt": string,
  "updatedAt": string,
}


export interface IAdminPages {
  admins: IAdmin[];
  meta: {
    page: number,
    take: number,
    itemCount: number,
    pageCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
  }
}
