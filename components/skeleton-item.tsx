import { useEffect, useRef } from "react";

import { Animated, StyleSheet, View } from "react-native";

export default function SkeletonItem() {

  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {

    Animated.loop(

      Animated.sequence([

        Animated.timing(opacity, {

          toValue: 0.3,

          duration: 500,

          useNativeDriver: true,

        }),

        Animated.timing(opacity, {

          toValue: 1,

          duration: 500,

          useNativeDriver: true,

        }),

      ])

    ).start();

  }, []);

  return (

    <Animated.View style={[styles.container, { opacity }]}>

      <View style={styles.avatar} />

      <View style={styles.textContainer}>

        <View style={styles.title} />

        <View style={styles.subtitle} />

      </View>

    </Animated.View>

  );

}

const styles = StyleSheet.create({

  container: {

    flexDirection: "row",

    alignItems: "center",

    padding: 16,

    backgroundColor: "#FFFFFF",

    borderBottomWidth: 1,

    borderBottomColor: "#E2E8F0",

  },

  avatar: {

    width: 48,

    height: 48,

    borderRadius: 24,

    backgroundColor: "#CBD5E1",

  },

  textContainer: {

    marginLeft: 12,

    flex: 1,

  },

  title: {

    width: "60%",

    height: 16,

    borderRadius: 4,

    backgroundColor: "#CBD5E1",

    marginBottom: 8,

  },

  subtitle: {

    width: "40%",

    height: 12,

    borderRadius: 4,

    backgroundColor: "#CBD5E1",

  },

});
