export class Role {
  public static placeholder: Role = new Role('', '');

  constructor(public readonly domain: string, public readonly key: string) {}

  public get rule() {
    return `${this.domain}.${this.key}`;
  }
}

interface IPolicy {
  READ: Role;
  WRITE: Role;
  // EXECUTE: Role;
}

export const POLICY: IPolicy = {
  READ: Role.placeholder,
  WRITE: Role.placeholder,
  // EXECUTE: Role.placeholder,
};

const ROLES: Record<string, IPolicy> = new Proxy(
  {},
  {
    set(
      target: Record<string, IPolicy>,
      index: string,
      val: IPolicy,
      receiver,
    ) {
      target[index] = {} as IPolicy;
      Object.keys(val).forEach((key: unknown) => {
        target[index][key as keyof IPolicy] = new Role(index, key as string);
      });
      return true;
    },
  },
);

// Roles construct
ROLES.ADMIN = { ...POLICY };
ROLES.MANAGER = { ...POLICY };
ROLES.USER_MANAGEMENT = { ...POLICY };

export { ROLES };
