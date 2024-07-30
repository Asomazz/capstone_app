import { View, Text, StyleSheet, Switch, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-elements";
import Header from "../../components/Header";

export default function Payment() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const opacity = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (isSwitchOn) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSwitchOn, opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Header />
      <View style={styles.section}>
        <Text style={styles.title}>Payment Methods</Text>
        <Button
          title="Connect Your Bank Account"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.addPayPal}>+ Add Stripe</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Enable Terms & Condition</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={(value) => setIsSwitchOn(value)}
          />
        </View>
        <Text style={styles.description}>
          When enabled, customers are required to agree to the terms and
          conditions before the sale can be completed. The agreement checkbox
          will appear on each checkout page.
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#403a58",
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FB543C",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  addPayPal: {
    fontSize: 14,
    color: "#403a58",
    fontWeight: "500",
    textAlign: "right",
    marginTop: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#444",
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
});
