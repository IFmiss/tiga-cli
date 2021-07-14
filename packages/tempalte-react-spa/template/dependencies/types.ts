export type ModuleDependencies = Record<
  'devDependencies' | 'dependencies',
  {
    [prop: string]: string;
  }
>;
