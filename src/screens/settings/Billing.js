import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Billing() {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Billing</Text>
      <View style={styles.billingContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Creator</Text>
          <Text style={styles.price}>10 KWD/Month</Text>
        </View>
        <Text style={styles.subtitle}>Billed Monthly</Text>
        <Text style={styles.expiry}>Your trial expires on August 30, 2024</Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cancel Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Change Plan</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.paymentDetailsTitle}>Payment Details</Text>
      <View style={styles.paymentDetailsContainer}>
        <TextInput
          style={styles.input}
          placeholder="**** **** **** 4045"
          placeholderTextColor="#999"
        />
        <View style={styles.row}>
          <TextInput
            style={styles.inputHalf}
            placeholder="MM/YY"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="CVC"
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#222",
    textAlign: "center",
  },
  billingContainer: {
    padding: 25,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 30,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: "#444",
  },
  price: {
    fontSize: 18,
    color: "#5a67d8",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  expiry: {
    fontSize: 16,
    color: "#555",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#5a67d8",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  updateButton: {
    backgroundColor: "#48BB78",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentDetailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
  },
  paymentDetailsContainer: {
    padding: 25,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  input: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  inputHalf: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#333",
    width: "48%",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
