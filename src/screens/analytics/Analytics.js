import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getProfile } from "../../apis/auth";

const screenWidth = Dimensions.get("window").width;

const AnalyticsPage = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["storeOwnerProfile"],
    queryFn: getProfile,
  });

  const [selectedMetric, setSelectedMetric] = useState("productClicks");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [showProductList, setShowProductList] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (data) {
      updateChartData(selectedMetric);
    }
  }, [data, selectedMetric, selectedProduct]);

  const updateChartData = (metric) => {
    if (!data) return;

    let labels = [];
    let dataset = [];
    const products = data.products || [];
    switch (metric) {
      case "productClicks":
        if (selectedProduct) {
          labels = ["Clicks", "Purchases"];
          dataset = [
            selectedProduct.productClicks || 0,
            selectedProduct.purchaseCount || 0,
          ];
        } else {
          labels = products.map((product) => product.title);
          dataset = products.map((product) => product.productClicks || 0);
        }
        break;
      case "storeClicks":
        labels = ["Store Visits"];
        dataset = [data.storeClicks || 0];
        break;
      case "instagramClicks":
        labels = ["Instagram"];
        dataset = [data.instagramClicks || 0];
        break;
      case "tiktokClicks":
        labels = ["TikTok"];
        dataset = [data.tiktokClicks || 0];
        break;
      case "snapchatClicks":
        labels = ["Snapchat"];
        dataset = [data.snapchatClicks || 0];
        break;
      case "twitterClicks":
        labels = ["Twitter"];
        dataset = [data.twitterClicks || 0];
        break;
      default:
        break;
    }

    setChartData({
      labels,
      datasets: [
        {
          data: dataset,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    });
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setShowProductList(false);
  };

  //   if (isLoading) {
  //     return (
  //       <View style={styles.loadingContainer}>
  //         <ActivityIndicator size="large" color="#574EFA" />
  //       </View>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <View style={styles.errorContainer}>
  //         <Text style={styles.errorText}>Error fetching data</Text>
  //       </View>
  //     );
  //   }

  const {
    products = [],
    storeClicks = 0,
    instagramClicks = 0,
    tiktokClicks = 0,
    snapchatClicks = 0,
    twitterClicks = 0,
  } = data || {};

  const productClicks = products.reduce(
    (acc, product) => acc + (product.productClicks || 0),
    0
  );

  const cardData = [
    { title: "Product Clicks", value: productClicks, metric: "productClicks" },
    { title: "Store Visits", value: storeClicks, metric: "storeClicks" },
    {
      title: "Instagram Clicks",
      value: instagramClicks,
      metric: "instagramClicks",
    },
    { title: "TikTok Clicks", value: tiktokClicks, metric: "tiktokClicks" },
    {
      title: "Snapchat Clicks",
      value: snapchatClicks,
      metric: "snapchatClicks",
    },
    { title: "Twitter Clicks", value: twitterClicks, metric: "twitterClicks" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>My Store Analytics</Text>
      <View style={styles.chartContainer}>
        {isLoading ? null : (
          <LineChart
            data={chartData}
            width={screenWidth - 20}
            height={250}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
            fromZero
            style={styles.chart}
          />
        )}
      </View>
      <FlatList
        data={cardData}
        keyExtractor={(item) => item.metric}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              if (item.metric === "productClicks") {
                setShowProductList(!showProductList);
              } else {
                setSelectedMetric(item.metric);
              }
            }}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardValue}>{item.value}</Text>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.cardContainer}
      />
      {showProductList && (
        <View style={styles.drawerContainer}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>Select a Product</Text>
            <TouchableOpacity onPress={() => setShowProductList(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => handleProductSelect(item)}
              >
                <Text style={styles.drawerItemText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
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
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  chartContainer: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  chart: {
    borderRadius: 16,
  },
  cardContainer: {
    justifyContent: "space-between",
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginVertical: 10,
    width: "47%",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#574EFA",
  },
  drawerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%", // Make the drawer smaller
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  drawerItemText: {
    fontSize: 16,
  },
});

export default AnalyticsPage;
