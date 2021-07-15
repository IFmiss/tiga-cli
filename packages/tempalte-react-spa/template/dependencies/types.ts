export type ModuleDependencies = Record<
  'devDependencies' | 'dependencies',
  {
    [prop: string]: string;
  }
>;

export type GeneralModuleDependencies<T> = Record<
  'devDependencies' | 'dependencies',
  T
>;
