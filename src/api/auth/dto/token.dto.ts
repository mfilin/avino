export class TokenDto {
  id: string;
  login: string;
  is_admin: boolean;
  ts: number;
  readonly policies?: Record<string, string>;
}
