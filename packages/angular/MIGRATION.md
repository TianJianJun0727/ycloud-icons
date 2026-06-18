# Migrating from `ycloud-angular` ⇒ `@ycloud-web/icons-angular`

## What changed

`@ycloud-web/icons-angular` moves from a module + single component based API to a more modern Angular approach:

- The library defines modern signal-based, standalone components, without zone.js based change detection.
- Icons are consumed as standalone imports (one component per icon).
- Dynamic icon registration is done via `provideYCloudIcons()`, not using `NgModule`.
- Static icons use per-icon components for better tree-shaking.
- Dynamic icons still use a single dynamic component (`svg[ycloudIcon]`).
- Global defaults are configured via `provideYCloudConfig()`.

---

## Step 1 – Update dependencies

Remove `ycloud-angular`, add `@ycloud-web/icons-angular`, see http://tianjianjun0727.github.io/ycloud-icons/guide/packages/angular#installation

---

## Step 2 – Replace `YCloudAngularModule.pick(...)` with `provideYCloudIcons(...)`

> Notes:
>
> - Old imports like `AirVentIcon` / `AlarmClock` from `ycloud-angular` should be replaced with the new per-icon exports `YCloudAirVent` and `YCloudAlarmClock`.
> - If you mostly used static icons, you may not need to provide them **at all**, please refer to Step 3.

### Before

#### NgModule based

```ts
import { BrowserModule, NgModule } from '@angular/core';
import { YCloudAngularModule, AirVent, AlarmClock } from 'ycloud-angular';

@NgModule({
  imports: [BrowserModule, YCloudAngularModule.pick({ AirVent, AlarmClock })],
})
export class AppModule {}
```

#### Standalone

```ts
import { ApplicationConfig } from '@angular/core';
import { YCloudAngularModule, AirVent, AlarmClock } from 'ycloud-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    importProvidersFrom(YCloudAngularModule.pick({ AirVent, AlarmClock })),
  ],
};
```

### After

```ts
import { ApplicationConfig } from '@angular/core';
import { provideYCloudIcons, YCloudAirVent, YCloudAlarmClock } from '@ycloud-web/icons-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    provideYCloudIcons(YCloudAirVent, YCloudAlarmClock),
  ],
};
```

---

## Step 3 – Replace `<ycloud-angular>` / `<ycloud-icon>` / `<i-ycloud>` / `<span-ycloud>`

The legacy package rendered everything through a single component. All of these selectors must be migrated to `<svg>` usage.

### A. Static icons by name

If the icon is known at build time, just use a static import:

#### Before

```html
<ycloud-angular name="circle-check"></ycloud-angular>
```

#### After

```html
<svg ycloudCircleCheck></svg>
```

### B. Static icons with icon data binding

#### Before

```ts
import { CircleCheck } from 'ycloud-angular';
```

```html
<ycloud-icon [img]="CircleCheck"></ycloud-icon>
```

#### After

```ts
import { YCloudCircleCheck } from '@ycloud-web/icons-angular';
```

```html
<svg ycloudCircleCheck></svg>
```

...and import `YCloudCircleCheck` from `@ycloud-web/icons-angular`.

---

### C. Dynamic icons

If the icon varies at runtime, use the dynamic component:

#### Before

```html
<ycloud-icon [name]="item.icon"></ycloud-icon>
```

#### After

```html
<svg [ycloudIcon]="item.icon"></svg>
```

---

## Step 4 – Replace `YCloudIconConfig` with `provideYCloudConfig()`

### Before

```ts
import { inject } from '@angular/core';
import { YCloudIconConfig } from 'ycloud-angular';

inject(YCloudIconConfig).size = 12;
```

### After

```ts
import { provideYCloudConfig } from '@ycloud-web/icons-angular';

providers: [provideYCloudConfig({ size: 12 })];
```

### Where to place it

- App-wide: `AppModule.providers` or `bootstrapApplication(...providers)`
- Feature-level: feature module providers
- Component-level (standalone): component `providers`

---

## Troubleshooting

### The icon is not being displayed

If using per-icon-components:

1. Ensure that the icon component is being imported, if using per-icon-components
2. Check that the icon name matches exactly (case-sensitive)

If using the dynamic component:

1. Ensure the icon is provided via `provideYCloudIcons()` if using string names
2. Verify the icon is imported from `@ycloud-web/icons-angular` and not the legacy package

### TypeScript errors?

Make sure you're importing from `@ycloud-web/icons-angular` and not `ycloud-angular`.

### Icons render with wrong defaults

Ensure `provideYCloudConfig()` is used at the right level.

---

## TL;DR

- `YCloudAngularModule` ⇒ static: removed; dynamic: `YCloudIcon`
- `YCloudAngularModule.pick(...)` ⇒ `provideYCloudIcons(...)`
- `<ycloud-angular name="foo-bar">` ⇒ `<svg ycloudFooBar>`
- `<ycloud-icon [name]="expr">` ⇒ `<svg [ycloudIcon]="expr">`
- `<ycloud-icon [img]="expr">` ⇒ `<svg [ycloudIcon]="expr">`
- `YCloudIconConfig` ⇒ `provideYCloudConfig(...)`
