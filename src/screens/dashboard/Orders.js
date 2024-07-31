import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../apis/auth";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";

const Orders = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["ordersProfile"],
    queryFn: getProfile,
  });

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterType, setFilterType] = useState("email");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (data && data.receipts) {
      setFilteredOrders(
        data.receipts.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    }
  }, [data]);

  useEffect(() => {
    if (data && data.receipts) {
      const filtered = data.receipts.filter((receipt) => {
        if (filterType === "email") {
          return receipt.customerEmail
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        } else if (filterType === "name") {
          return receipt.customerName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        } else if (filterType === "date") {
          const date = new Date(receipt.createdAt);
          const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
          return formattedDate.includes(searchQuery);
        }
      });
      setFilteredOrders(
        filtered.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    }
  }, [searchQuery, filterType, data]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FC533E" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error receiving data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Back to Dashboard" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search by ${filterType}`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="filter" size={24} color="#FC533E" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text
                style={styles.orderTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Receipt: {item?.receiptNumber}
              </Text>
              <Text style={styles.orderAmount}>{item.totalAmount} KWD</Text>
            </View>
            <Text style={styles.orderDate}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
            <View style={styles.orderDetail}>
              <Text style={styles.detailLabel}>Email:</Text>
              <Text style={styles.detailValue}>{item.customerEmail}</Text>
            </View>
            <View style={styles.orderDetail}>
              <Text style={styles.detailLabel}>Name:</Text>
              <Text style={styles.detailValue}>{item.customerName}</Text>
            </View>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="times" size={24} color="#FC533E" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filter By</Text>
            <TouchableOpacity
              onPress={() => {
                setFilterType("email");
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalOption}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilterType("name");
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalOption}>Customer's Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilterType("date");
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalOption}>Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    marginRight: 10,
  },
  filterIcon: {
    borderWidth: 1,
    borderColor: "#FC533E",
    borderRadius: 10,
    padding: 5,
  },
  orderCard: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  orderTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginRight: 10,
  },
  orderAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FC533E",
  },
  orderDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  orderDetail: {
    flexDirection: "row",
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    width: "30%",
  },
  detailValue: {
    fontSize: 12,
    color: "#000",
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalOption: {
    fontSize: 16,
    padding: 10,
    width: "100%",
    textAlign: "center",
    color: "#FC533E",
  },
});

export default Orders;
