---
title: Filled Icons - React Native
description: Learn how to use fills with YCloud icons in your React Native application, and the limitations of using fills with YCloud icons.
---

# Filled Icons

Generic icons from the package's default entrypoint are stroke-based and do not include an automatically generated filled counterpart for every icon. You can still pass standard SVG properties such as `fill`, which works for shapes that support it.

Authored business icons are separate assets. Filled business icons are exported from the [`business` subpath](/en/guide/business-icons) with file-name-derived component names such as `CallingFilled`.

Example with stars:

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
