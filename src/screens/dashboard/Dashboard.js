import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { getProfile } from "../../apis/auth";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const Dashboard = () => {
  const navigation = useNavigation();
  const { data, error, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["dashboardProfile"],
    queryFn: getProfile,
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [0, 0, 0, 0, 0] }],
  });

  useEffect(() => {
    if (data) {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 4);

      const dateLabels = [];
      const dateData = {};

      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateString = `${d.getDate()}/${d.getMonth() + 1}`;
        dateLabels.push(dateString);
        dateData[dateString] = 0;
      }

      data.receipts.forEach((receipt) => {
        const date = new Date(receipt.createdAt);
        const dateString = `${date.getDate()}/${date.getMonth() + 1}`;
        if (dateString in dateData) {
          dateData[dateString] += receipt.totalAmount;
        }
      });

      const labels = dateLabels;
      const dataset = labels.map((label) => dateData[label]);

      setChartData({
        labels,
        datasets: [
          {
            data: dataset,
            color: (opacity = 1) => `rgba(252, 83, 62, ${opacity})`,
            strokeWidth: 2,
          },
        ],
      });
    }
  }, [data]);

  const totalRevenue = data?.revenue ?? 0;
  const receipts =
    data?.receipts?.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }) ?? [];

  const storeClicks =
    data?.clicks?.filter((click) => click.storeClick).length ?? 0;

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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.dashboardText}>
          Welcome {data?.username} to your Fluid Store Dashboard
        </Text>
        <Text style={styles.revenueText}>Total Revenue:</Text>
        <Text style={styles.revenueAmount}>{totalRevenue} KWD</Text>
      </View>
      <View style={styles.chartContainer}>
        {data?.receipts && (
          <BarChart
            data={chartData}
            width={screenWidth - 55}
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
            yAxisSuffix=""
            yAxisInterval={1}
            style={styles.chart}
          />
        )}
      </View>
      <View style={styles.analyticsContainer}>
        <View style={styles.analyticsCards}>
          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsCardTitle}>Store Visits</Text>
            <Text style={styles.analyticsCardValue}>{storeClicks}</Text>
          </View>
          {/* Add more cards here if needed */}
        </View>
      </View>
      <View style={styles.ordersContainer}>
        <View style={styles.ordersHeader}>
          <Text style={styles.ordersTitle}>Your Recent Orders:</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {receipts.slice(0, 5).map((receipt) => (
          <View key={receipt._id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text
                style={styles.orderTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Receipt: {receipt?.receiptNumber}
              </Text>
              <Text style={styles.orderAmount}>{receipt.totalAmount} KWD</Text>
            </View>
            <Text style={styles.orderDate}>
              {new Date(receipt.createdAt).toLocaleString()}
            </Text>
            <View style={styles.orderDetail}>
              <Text style={styles.detailLabel}>Email:</Text>
              <Text style={styles.detailValue}>{receipt.customerEmail}</Text>
            </View>
            <View style={styles.orderDetail}>
              <Text style={styles.detailLabel}>Name:</Text>
              <Text style={styles.detailValue}>{receipt.customerName}</Text>
            </View>
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
  color: (opacity = 1) => `rgba(252, 83, 62, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#FC533E",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  headerContainer: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dashboardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  revenueText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  revenueAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FC533E",
  },
  chartContainer: {
    marginVertical: 8,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  chart: {
    borderRadius: 16,
  },
  analyticsContainer: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  analyticsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  analyticsCards: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  analyticsCard: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    marginHorizontal: 5,
  },
  analyticsCardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  analyticsCardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FC533E",
  },
  ordersContainer: {
    marginVertical: 20,
  },
  ordersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  ordersTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  viewAll: {
    fontSize: 14,
    color: "#FC533E",
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
});

export default Dashboard;
