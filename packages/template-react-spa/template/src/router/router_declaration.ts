export default `interface IRoute {
  path: string | string[];
  component:
    | LazyExoticComponent<ComponentType<any>>
    | NamedExoticComponent<any>;
  // 是否精确匹配
  exact?: boolean;
  // 启用懒加载的
  fallback?: NonNullable<ReactNode> | null;
  // 嵌套路由
  routes?: IRoute[];
  // 重定向路径
  redirect?: string;
}

interface RouterProviderProps {
  routes: IRoute[];
}

type RFC<T> = React.FC<T & RouterProviderProps>;
`;
