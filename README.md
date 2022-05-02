# rc-router-dom
`rc-router-dom` uses `react-router-dom@6` Developed a library similar to Vue routing configuration.

## Installing

```shell
npm i react-router-dom @quick-toolkit/rc-router-dom
#or
yarn add react-router-dom @quick-toolkit/rc-router-dom
```

## Example Usage

```jsx
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { router } from '@quick-toolkit/rc-router-dom';
import { store } from './store';
import { FullSpinning } from './components';

export function Bootstrap() {
  // Provide language name;
  const language = 'zh_CN';
  // Provide permissions;
  const permissions = [];
  return (
    <div className="app">
      <Provider store={store}>
        <Suspense fallback={<FullSpinning />}>{router.toElement(language, permissions)}</Suspense>
      </Provider>
    </div>
  );
}
```

## Documentation
- [ApiDocs](https://quick-toolkit.github.io/rc-router-dom/)
- [Samples](https://github.com/quick-toolkit/rc-router-dom/tree/master/sample)
- [GitRepository](https://github.com/quick-toolkit/rc-router-dom)


## Issues
Create [issues](https://github.com/quick-toolkit/rc-router-dom/issues) in this repository for anything related to the rc-router-dom. When creating issues please search for existing issues to avoid duplicates.


## License
Licensed under the [MIT](https://github.com/quick-toolkit/rc-router-dom/blob/master/LICENSE) License.
