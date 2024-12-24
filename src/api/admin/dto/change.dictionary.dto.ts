export class ChangeDictionaryDto {
  readonly slug: string;
  readonly parent: string | null;
  readonly props: object;
}
