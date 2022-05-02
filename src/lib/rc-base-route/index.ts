/**
 * MIT License
 *
 *  Copyright (c) 2021 @quick-toolkit/rc-router-dom YunlongRan<549510622@qq.com>
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

import { compile, pathToRegexp } from 'path-to-regexp';
import { Route } from 'react-router-dom';

import React, {
  ComponentClass,
  createContext,
  createElement,
  FunctionComponent,
  LazyExoticComponent,
  ReactElement,
  ReactNode,
} from 'react';
import { LocaleLanguageKey } from '../../constants';
import { RouteView } from '../../components/route-view';

/**
 * 抽象基础路由类
 * @class RCBaseRoute
 */
export abstract class RCBaseRoute<T = any, L extends {} = {}> {
  /**
   * 路由的Provider提供的上下文
   */
  public static Context: React.Context<RCBaseRoute>;

  /**
   * 路由path 不允许以斜杠开头
   * @abstract
   */
  private path: string;

  /**
   * 路由名称 只允许 /^[A-z][A-z0-9_]+/
   * @abstract
   */
  private name: string;

  /**
   * 当前语言
   */
  public language: LocaleLanguageKey = 'zh_CN';

  /**
   * 构造函数
   * @param path 路由路径
   * @param name 路由名称
   * @param id 路由的id
   * @param controller 路由控制器
   * @param children 路由子页面
   * @param root 路由的根路由
   * @param parent 父路由
   * @param title 标题
   * @param icon 图标
   * @param extras 额外数据
   * @param hideMenu 是否在菜单中隐藏
   * @param description 描述
   * @param permissions 权限列表
   * @param locales 本地语言包
   */
  protected constructor(
    path: string,
    name: string,
    public readonly controller:
      | FunctionComponent<any>
      | ComponentClass<any>
      | LazyExoticComponent<any>,
    public readonly id?: string | number,
    children?: RCBaseRoute[],
    public root?: RCBaseRoute,
    public parent?: RCBaseRoute,
    public readonly title?: string,
    public readonly icon?: FunctionComponent<any> | ComponentClass<any>,
    public readonly extras?: T,
    public readonly hideMenu?: boolean,
    public readonly description?: string,
    public permissions?: string | string[],
    public readonly locales: Partial<Record<LocaleLanguageKey, L>> = {}
  ) {
    this.setPath(path);
    this.setName(name);
    if (!this.root) {
      this.root = this as any;
    }
  }

  /**
   * 路由私有state管理
   */
  public routeStateMap: Map<Function, any> = new Map();

  /**
   * 子路由列表
   */
  public children?: RCBaseRoute[];

  /**
   * 向上查找父，找到指定name的route为止，如果不指定name则返回所有
   */
  public getParentsByName(name?: string): RCBaseRoute[] {
    if (this.parent) {
      if (name && this.parent.name === name) {
        return [this.parent];
      } else {
        return this.parent.getParentsByName(name).concat([this.parent]);
      }
    }
    return [];
  }

  /**
   * 向上查找父，找到指定path的route为止，如果不指定path则返回所有
   * @param path
   */
  public getParentsByPath(path?: string): RCBaseRoute[] {
    if (this.parent) {
      if (path && pathToRegexp(this.parent.getFullPath()).test(path)) {
        return [this.parent];
      } else {
        return this.parent.getParentsByName(path).concat([this.parent]);
      }
    }
    return [];
  }

  /**
   * 获取所有子路由
   */
  public getAllChildren(): RCBaseRoute[] {
    if (this.children) {
      return this.children.concat(
        ...this.children.map((o) => o.getAllChildren())
      );
    }
    return [];
  }

  /**
   * 所有父级
   */
  public getAllParents(): RCBaseRoute[] {
    const { parent } = this;
    if (parent) {
      return [parent, ...parent.getAllParents()];
    }
    return [];
  }

  /**
   * 根据名称获取路由
   * @param name
   */
  public getRouteByName(name: string): RCBaseRoute | undefined {
    return this.getAllChildren().find((o) => o.name === name);
  }

  /**
   * 根据path获取路由
   * @param path
   */
  public getRouteByPath(path: string): RCBaseRoute | undefined {
    return this.getAllChildren().find((o) =>
      pathToRegexp(o.getFullPath()).test(path)
    );
  }

  /**
   * 设置路由名称
   * @param name
   */
  public setName(name: string): void {
    if (/^[A-z][A-z0-9_]+/.test(name)) {
      this.name = name;
    } else {
      console.error('Route name must match "/^[A-z][A-z0-9_]+/".');
      console.error(`   at route name: "${name}"`);
      console.error(`   at route path: "${this.path}"`);
    }
  }

  /**
   * 获取路由名称
   */
  public getName(): string {
    return this.name;
  }

  /**
   * 设置path
   * @param path 路由path不允许以斜杠开头
   */
  public setPath(path: string): void {
    if (!/^\//.test(path) && !/\/$/.test(path)) {
      this.path = path;
    } else {
      console.error('Route path cannot start and end with "/".');
      console.error(`   at route path: "${path}"`);
      console.error(`   at route name: "${this.name}"`);
    }
  }

  /**
   * 获取path
   */
  public getPath(): string {
    return this.path;
  }

  /**
   * 获取完整路径
   */
  public getFullPath(): string {
    if (this.parent) {
      return [this.parent.getFullPath(), this.getPath()]
        .join('/')
        .replace(/\/{2}/g, '/');
    }
    return ['', this.getPath()].join('/').replace(/\/{2}/g, '/');
  }

  /**
   * 转换为路径
   * @param data
   */
  public toPath(data: Record<string, string | number>): string {
    return compile(this.getFullPath(), { encode: encodeURIComponent })(data);
  }

  /**
   * 带有权限的路由列表
   */
  public permissionRoutes: RCBaseRoute[] = [];

  /**
   * 获取具有权限的首个路由
   */
  public getHasPermissionFirstRoute(): RCBaseRoute | false {
    if (this.permissionRoutes.length) {
      return this.permissionRoutes[0];
    }
    return false;
  }

  /**
   * 将element创建为React元素
   * @private
   */
  private createNode(): ReactNode | undefined {
    if (!RCBaseRoute.Context) {
      RCBaseRoute.Context = createContext(this as any);
    }
    if (this.controller) {
      return createElement(RCBaseRoute.Context.Provider, {
        value: this,
        children: createElement(RouteView, {
          $route: this,
          children: this.controller,
        }),
      });
    }
  }

  /**
   * 转换成Route元素
   * @param permissions 权限列表
   * @param language 当前语言
   */
  public toElement(
    language: LocaleLanguageKey = 'zh_CN',
    permissions: string[] = []
  ): ReactElement {
    this.permissionRoutes = (this.children || []).filter((o) => {
      if (Array.isArray(o.permissions)) {
        return o.permissions.some((x) => permissions.includes(x));
      } else if (typeof o.permissions === 'string') {
        return permissions.includes(o.permissions);
      }
      return true;
    });
    this.language = language;
    return createElement(Route, {
      path: this.path,
      element: this.createNode(),
      children: this.permissionRoutes.map((o) =>
        o.toElement(language, permissions)
      ),
    });
  }
}

export interface RCBaseRouteImpl<T = any> {
  readonly path: string;
  readonly name: string;
  readonly controller:
    | FunctionComponent<any>
    | ComponentClass<any>
    | LazyExoticComponent<any>;
  readonly id?: string | number;
  readonly children?: RCBaseRoute[];
  root?: RCBaseRoute;
  parent?: RCBaseRoute;
  readonly title?: string;
  readonly icon?: FunctionComponent<any> | ComponentClass<any>;
  readonly extras?: T;
  readonly hideMenu?: boolean;
  readonly description?: string;
  readonly permissions?: string | string[];
  readonly locales?: Partial<Record<LocaleLanguageKey, Record<string, string>>>;
}
