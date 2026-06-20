---
layout: home
markdownStyles: false
title: YCloud Icons
titleTemplate: false

head:
  - - link
    - rel: canonical
      content: https://tianjianjun0727.github.io/ycloud-icons/en/

hero:
  name: |
    YCloud Icons
  text: Multi-framework SVG icon infrastructure
  tagline: A Lucide-based icon system that ships typed React components, Vue and multi-framework packages, static assets, and tree-shakable icon data from one source.
  image:
    src: /favicon.svg
    alt: YCloud Icons
  actions:
    - theme: brand
      text: Browse icons
      link: icons/
    - theme: alt
      text: Get started
      link: guide/
    - theme: alt
      text: GitHub
      link: https://github.com/TianJianJun0727/ycloud-icons

features:
  - title: Lightweight
    details: Icons are delivered as optimized SVG and framework-specific modules, so applications only bundle what they import.
  - title: Consistent
    details: A shared source and generation pipeline keeps icon names, metadata, and package output aligned across frameworks.
  - title: Customizable
    details: Control color, size, stroke width, and accessibility attributes with props or CSS.
  - title: Multi-framework
    details: React, Vue, Svelte, Solid, Preact, React Native, Angular, Astro, core JavaScript, and static assets are generated from the same icon source.
  - title: Tree-shakable
    details: ESM entry points allow bundlers to remove unused icons from production builds.
  - title: Release-ready
    details: The repository supports npm Trusted Publishing and can later be adapted to private registry workflows.
---

<script setup>
import HomePackagesSection from '~/.vitepress/theme/components/home/HomePackagesSection.vue'
import HomeIconCustomizer from '~/.vitepress/theme/components/home/HomeIconCustomizer.vue'
</script>

<HomePackagesSection />
<HomeIconCustomizer />
