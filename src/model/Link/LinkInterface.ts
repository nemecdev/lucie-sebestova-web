export interface LinkInterface {
  setLabel(label: string): void,
  setHref(href: string): void,
  setTarget(target: string): void,
  setIsActive(value: boolean): void,
  getLabel(): string,
  getHref(): string,
  getTarget(): string,
  getIsActive(): boolean,
  getSource(): string,
  getType(): string,
}