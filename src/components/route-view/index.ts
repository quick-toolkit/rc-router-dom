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

import { useRoute } from '../../hooks';
import React, {
  createElement,
  ReactElement,
  ReactNode,
  useEffect,
} from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

/**
 * RouteView
 * @param props
 * @constructor
 */
export function RouteView(props: { children: ReactNode }): ReactElement {
  const route = useRoute();
  const navigate = useNavigate();
  const isMatch = useMatch(route.getFullPath());
  useEffect(() => {
    if (isMatch) {
      const hasPermissionFirstRoute = route.getHasPermissionFirstRoute();
      if (hasPermissionFirstRoute) {
        navigate(hasPermissionFirstRoute.getFullPath());
      } else {
        const allParents = route.getAllParents().reverse().concat([route]);
        document.title = allParents.map((o) => o.title).join('');
      }
    }
  }, [isMatch, navigate, route]);
  return React.createElement(React.Fragment, {
    children: createElement(props.children as any),
  });
}
