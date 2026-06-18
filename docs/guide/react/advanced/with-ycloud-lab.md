---
title: With YCloud Lab or custom icons - React
description: Learn how to use YCloud Lab or custom icons in your React applications using the Icon component.
---

# With YCloud Lab or custom icons

[YCloud Lab](https://github.com/TianJianJun0727/ycloud-icons-lab) is a collection of icons that are not part of the YCloud main library.

They can be used by using the `Icon` component.
All props like regular ycloud icons can be passed to adjust the icon appearance.

## Using the `Icon` component

This creates a single icon based on the iconNode passed and renders a YCloud icon component.

```jsx
import { Icon } from '@ycloud-web/icons-react';
import { coconut } from '@ycloud-web/icons-lab';

const App = () => <Icon iconNode={coconut} />;
```
