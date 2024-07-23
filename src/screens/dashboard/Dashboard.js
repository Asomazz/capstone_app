import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getProfile } from "../../apis/auth";

const screenWidth = Dimensions.get("window").width;

const Dashboard = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["creatorProfile"],
    queryFn: getProfile,
  });

  const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [] }] });

  useEffect(() => {
    if (data && data.receipts) {
      // Sort receipts by createdAt date in descending order
      const sortedReceipts = data.receipts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      // Get the 7 most recent receipts
      const recentReceipts = sortedReceipts.slice(0, 5);
      const labels = recentReceipts.map((entry) => {
        const date = new Date(entry.createdAt);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }).reverse(); // Reverse to maintain chronological order
      const dataset = recentReceipts.map((entry) => entry.totalAmount).reverse();
      setChartData({ labels, datasets: [{ data: dataset, color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, strokeWidth: 2 }] });
    }
  }, [data]);

  const totalRevenue = data?.revenue ?? 0;
  const receipts = data?.receipts ?? [];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#574EFA" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.dashboardText}>Welcome {data?.username} to your Fluid Store Dashboard</Text>
        <Text style={styles.revenueText}>Total Revenue:</Text>
        <Text style={styles.revenueAmount}>{totalRevenue} KWD</Text>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={screenWidth - 20}
          height={250}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          bezier
          fromZero
          withVerticalLabels
          withHorizontalLabels
          withDots
          withShadow
          withInnerLines
          withOuterLines
          yAxisLabel=""
          yAxisSuffix=" KWD"
          yAxisInterval={1}
          style={styles.chart}
        />
      </View>
      <View style={styles.ordersContainer}>
        <Text style={styles.ordersTitle}>Your Recent Orders:</Text>
        {receipts.slice(0, 7).map((receipt) => (
          <View key={receipt._id} style={styles.orderCard}>
            <Text style={styles.orderText}>Receipt Number: {receipt._id}</Text>
            <Text style={styles.orderText}>Timestamp: {new Date(receipt.createdAt).toLocaleString()}</Text>
            <Text style={styles.orderText}>Customer Email: {receipt.customerEmail}</Text>
            <Text style={styles.orderText}>Customer Name: {receipt.customerName}</Text>
            <Text style={styles.orderText}>Total Amount: {receipt.totalAmount} KWD</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(87, 78, 250, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#574EFA",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
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
  headerContainer: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  dashboardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  revenueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#574EFA",
    marginBottom: 5,
  },
  revenueAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  chartContainer: {
    marginVertical: 8,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  chart: {
    borderRadius: 16,
  },
  ordersContainer: {
    marginVertical: 20,
  },
  ordersTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  orderCard: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  orderText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
});

export default Dashboard;
