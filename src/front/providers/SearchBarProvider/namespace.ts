export interface ISearchBarControl {
  currentValue: string;
  setValue(newValue: string): void;
  pushSearchRoute(): void;
}
