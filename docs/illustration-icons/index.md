---
title: 插画
description: 浏览全部 YCloud Icons 插画。
layout: page
outline: 2
outlineTitle: 分类
sidebar: true
head:
  - - link
    - rel: canonical
      content: https://tianjianjun0727.github.io/ycloud-icons/illustration-icons/
---

<script setup>
import { data } from './illustration.data.ts'
import IllustrationsOverview from '~/.vitepress/theme/components/icons/IllustrationsOverview.vue'
import PageContainer from '~/.vitepress/theme/components/PageContainer.vue'
</script>

<div class="VPDoc content">
  <PageContainer>
    <IllustrationsOverview
      :illustrations="data.illustrations"
      :categories="data.categories"
    />
  </PageContainer>
</div>
