---
title: 填充图标 - React Native
description: 了解如何在 React Native 应用中为 YCloud Icons 使用填充，以及这种用法的限制。
---

# 填充图标

包默认入口中的通用图标采用线性描边风格，并不会为每个图标自动生成对应的填充版本。你仍然可以传入 `fill` 等标准 SVG 属性；它会在支持填充的图形上生效。

仓库还维护独立设计的业务图标。填充业务图标通过 [`business` 子入口](/guide/business-icons) 导出，名称由文件名生成，例如 `CallingFilled`。

下面是星级评分的示例：

```SnackPlayer name=State&ext=js&dependencies=react-native-svg,@ycloud-web/icons-react-native
import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Star, StarHalf } from "@ycloud-web/icons-react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.starRating}>
        <View style={styles.stars}>
          { Array.from({ length: 5 }, () => (
              <Star fill="#111" strokeWidth={0} />
          ))}
        </View>
        <View style={[styles.stars, styles.rating]}>
          <Star fill="orange" strokeWidth={0} />
          <Star fill="orange" strokeWidth={0} />
          <StarHalf fill="orange" strokeWidth={0} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  starRating: {
    position: 'relative',
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
  rating: {
    position: 'absolute',
    top: 0,
  }
});

export default App;
```
