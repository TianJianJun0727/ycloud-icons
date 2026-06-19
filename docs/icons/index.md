---
title: 图标
description: 浏览全部 YCloud Icons 图标。
layout: page
outline: 2
outlineTitle: 分类
sidebar: true
head:
  - - link
    - rel: canonical
      content: https://tianjianjun0727.github.io/ycloud-icons/icons/
---

<script setup>
import { data } from './icons.data.ts'
import IconsOverview from '~/.vitepress/theme/components/icons/IconsOverview.vue'
import PageContainer from '~/.vitepress/theme/components/PageContainer.vue'
</script>

<div class="VPDoc content">
  <PageContainer>
    <IconsOverview :icons="data.icons" />
  </PageContainer>
</div>
