// TODO: REMOVE
export enum RoleEnum {
  Admin = 'admin',
  Manage = 'manager',
}

type User = {
  id: string;
  userName: string;
  role: RoleEnum;
};

export interface IAuthenticate {
  readonly user: User;
}
