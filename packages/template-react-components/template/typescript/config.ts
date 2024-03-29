export default `{
  "compilerOptions": {
    "alwaysStrict": true,
    "target": "esnext",
    "module": "esnext",
    "removeComments": false,
    "declaration": true,
    "declarationDir": "./types",
    "outDir": "./dist",
    "baseUrl": ".",
    "esModuleInterop": true,
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "jsx": "react",
    "experimentalDecorators": true,
    "downlevelIteration": true,
    "allowJs": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "typeRoots": [
      "node_modules/@types",
      "global.d.ts",
      "typings"
    ],
    "lib": [
      "dom",
      "esnext"
    ],
    "paths": {
      "@/*": ["src/*"]
    },
    "sourceMap": false,
    "noImplicitAny": false
  },
  "include": [
    "src/"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
`;
