# Migration Guide: react-feather → ycloud-react

`react-feather` is similar to `ycloud-react`, the package is inspired by `react-feather`. The API is nearly identical, so migration is straightforward.

## 1. Install the new package

```sh
npm install ycloud-react
npm uninstall react-feather
```

## 2. Update imports

Replace all `react-feather` imports with `ycloud-react`:

```diff
- import { Home, User } from 'react-feather'
+ import { Home, User } from '@ycloud-web/icons-react'
```

You can do this across your entire codebase with a find-and-replace:

- Find: `from 'react-feather'`
- Replace: `from '@ycloud-web/icons-react'`

## 3. Renamed icons

Four icons have been renamed. Update any usages of these:

| react-feather | ycloud-react |
| ------------- | ------------ |
| `GitHub`      | `Github`     |
| `Grid`        | `LayoutGrid` |
| `Table`       | `Table2`     |
| `Tool`        | `Wrench`     |

### Examples

```diff
- import { GitHub, Grid, Table, Tool } from 'react-feather'
+ import { Github, LayoutGrid, Table2, Wrench } from '@ycloud-web/icons-react'

- <GitHub />
+ <Github />

- <Grid />
+ <LayoutGrid />

- <Table />
+ <Table2 />

- <Tool />
+ <Wrench />
```

## 4. All other icons

All remaining icons keep the same name and work as drop-in replacements. No other changes to props or usage are required.
