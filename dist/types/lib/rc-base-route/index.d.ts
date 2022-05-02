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
import React, { ComponentClass, FunctionComponent, LazyExoticComponent, ReactElement } from 'react';
import { LocaleLanguageKey } from '../../constants';
/**
 * 抽象基础路由类
 * @class RCBaseRoute
 */
export declare abstract class RCBaseRoute<T = any, L extends {} = {}> {
    readonly controller: FunctionComponent<any> | ComponentClass<any> | LazyExoticComponent<any>;
    readonly id?: string | number | undefined;
    root?: RCBaseRoute<any, {}> | undefined;
    parent?: RCBaseRoute<any, {}> | undefined;
    readonly title?: string | undefined;
    readonly icon?: React.FunctionComponent<any> | React.ComponentClass<any, any> | undefined;
    readonly extras?: T | undefined;
    readonly hideMenu?: boolean | undefined;
    readonly description?: string | undefined;
    permissions?: string | string[] | undefined;
    readonly locales: Partial<Record<LocaleLanguageKey, L>>;
    /**
     * 路由的Provider提供的上下文
     */
    static Context: React.Context<RCBaseRoute>;
    /**
     * 路由path 不允许以斜杠开头
     * @abstract
     */
    private path;
    /**
     * 路由名称 只允许 /^[A-z][A-z0-9_]+/
     * @abstract
     */
    private name;
    /**
     * 当前语言
     */
    language: LocaleLanguageKey;
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
    protected constructor(path: string, name: string, controller: FunctionComponent<any> | ComponentClass<any> | LazyExoticComponent<any>, id?: string | number | undefined, children?: RCBaseRoute[], root?: RCBaseRoute<any, {}> | undefined, parent?: RCBaseRoute<any, {}> | undefined, title?: string | undefined, icon?: React.FunctionComponent<any> | React.ComponentClass<any, any> | undefined, extras?: T | undefined, hideMenu?: boolean | undefined, description?: string | undefined, permissions?: string | string[] | undefined, locales?: Partial<Record<LocaleLanguageKey, L>>);
    /**
     * 路由私有state管理
     */
    routeStateMap: Map<Function, any>;
    /**
     * 子路由列表
     */
    children?: RCBaseRoute[];
    /**
     * 向上查找父，找到指定name的route为止，如果不指定name则返回所有
     */
    getParentsByName(name?: string): RCBaseRoute[];
    /**
     * 向上查找父，找到指定path的route为止，如果不指定path则返回所有
     * @param path
     */
    getParentsByPath(path?: string): RCBaseRoute[];
    /**
     * 获取所有子路由
     */
    getAllChildren(): RCBaseRoute[];
    /**
     * 所有父级
     */
    getAllParents(): RCBaseRoute[];
    /**
     * 根据名称获取路由
     * @param name
     */
    getRouteByName(name: string): RCBaseRoute | undefined;
    /**
     * 根据path获取路由
     * @param path
     */
    getRouteByPath(path: string): RCBaseRoute | undefined;
    /**
     * 设置路由名称
     * @param name
     */
    setName(name: string): void;
    /**
     * 获取路由名称
     */
    getName(): string;
    /**
     * 设置path
     * @param path 路由path不允许以斜杠开头
     */
    setPath(path: string): void;
    /**
     * 获取path
     */
    getPath(): string;
    /**
     * 获取完整路径
     */
    getFullPath(): string;
    /**
     * 转换为路径
     * @param data
     */
    toPath(data: Record<string, string | number>): string;
    /**
     * 带有权限的路由列表
     */
    permissionRoutes: RCBaseRoute[];
    /**
     * 获取具有权限的首个路由
     */
    getHasPermissionFirstRoute(): RCBaseRoute | false;
    /**
     * 将element创建为React元素
     * @private
     */
    private createNode;
    /**
     * 转换成Route元素
     * @param permissions 权限列表
     * @param language 当前语言
     */
    toElement(language?: LocaleLanguageKey, permissions?: string[]): ReactElement;
}
export interface RCBaseRouteImpl<T = any> {
    readonly path: string;
    readonly name: string;
    readonly controller: FunctionComponent<any> | ComponentClass<any> | LazyExoticComponent<any>;
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
