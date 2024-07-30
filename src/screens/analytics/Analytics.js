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

  const [selectedMetric, setSelectedMetric] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [0, 0, 0, 0, 0] }],
  });
  const [showProductList, setShowProductList] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    if (data) {
      updateChartData(selectedMetric, selectedProduct);
    }
  }, [data, selectedMetric, selectedProduct]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  const aggregateClicksByDate = (clicks) => {
    const aggregatedClicks = {};
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 4);

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateString = formatDate(d);
      aggregatedClicks[dateString] = {
        productClicks: 0,
        storeClicks: 0,
        instagramClicks: 0,
        tiktokClicks: 0,
        snapchatClicks: 0,
        twitterClicks: 0,
      };
    }

    clicks.forEach((click) => {
      const date = formatDate(click.createdAt);
      if (!aggregatedClicks[date]) {
        aggregatedClicks[date] = {
          productClicks: 0,
          storeClicks: 0,
          instagramClicks: 0,
          tiktokClicks: 0,
          snapchatClicks: 0,
          twitterClicks: 0,
        };
      }
      if (click.productClick) aggregatedClicks[date].productClicks += 1;
      if (click.storeClick) aggregatedClicks[date].storeClicks += 1;
      if (click.instagramClick) aggregatedClicks[date].instagramClicks += 1;
      if (click.tiktokClick) aggregatedClicks[date].tiktokClicks += 1;
      if (click.snapchatClick) aggregatedClicks[date].snapchatClicks += 1;
      if (click.twitterClick) aggregatedClicks[date].twitterClicks += 1;
    });

    return aggregatedClicks;
  };

  const aggregateProductClicksByDate = (productClicks, productId) => {
    const aggregatedClicks = {};
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 4);

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateString = formatDate(d);
      aggregatedClicks[dateString] = 0;
    }

    productClicks.forEach((click) => {
      if (click.product && click.product.toString() === productId) {
        const date = formatDate(click.createdAt);
        if (!aggregatedClicks[date]) {
          aggregatedClicks[date] = 0;
        }
        aggregatedClicks[date] += 1;
      }
    });

    return aggregatedClicks;
  };

  const updateChartData = (metric, productId) => {
    if (!data) return;

    let aggregatedClicks;
    if (metric === "productClicks" && productId) {
      const product = data.products.find((prod) => prod._id === productId);
      aggregatedClicks = aggregateProductClicksByDate(
        product.clicks || [],
        productId
      );
    } else {
      aggregatedClicks = aggregateClicksByDate(data.clicks || []);
    }

    const dates = Object.keys(aggregatedClicks).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    let labels = [];
    let datasets = [];

    const datasetMapping = {
      productClicks: {
        label: "Product Clicks",
        data: [],
        color: "rgba(134, 90, 70, 1)",
      },
      storeClicks: {
        label: "Store Visits",
        data: [],
        color: "rgb(251, 84, 60)",
      },
      instagramClicks: {
        label: "Instagram Clicks",
        data: [],
        color: "rgba(134, 65, 244, 1)",
      },
      tiktokClicks: {
        label: "TikTok Clicks",
        data: [],
        color: "rgba(255, 99, 132, 1)",
      },
      twitterClicks: {
        label: "X Clicks",
        data: [],
        color: "rgba(0, 0, 0, 1)",
      },
      snapchatClicks: {
        label: "Snapchat Clicks",
        data: [],
        color: "rgba(255, 230, 0, 1)",
      },
    };

    dates.forEach((date) => {
      labels.push(date);
      if (metric === "productClicks" && productId) {
        datasetMapping[metric].data.push(aggregatedClicks[date]);
      } else {
        for (const key in datasetMapping) {
          datasetMapping[key].data.push(aggregatedClicks[date][key]);
        }
      }
    });

    if (metric && metric !== "allClicks") {
      datasets = [
        {
          data: datasetMapping[metric].data,
          color: (opacity = 1) => datasetMapping[metric].color,
          strokeWidth: 2,
          label: datasetMapping[metric].label,
        },
      ];
    } else {
      datasets = Object.keys(datasetMapping).map((key) => ({
        data: datasetMapping[key].data,
        color: (opacity = 1) => datasetMapping[key].color,
        strokeWidth: 2,
        label: datasetMapping[key].label,
      }));
    }

    setChartData({
      labels,
      datasets,
    });

    const selectedTitle =
      metric === "productClicks" && productId
        ? data.products.find((prod) => prod._id === productId)?.title
        : cardData.find((card) => card.metric === metric)?.title;
    const selectedTotal =
      metric === "productClicks" && productId
        ? data.products
            .find((prod) => prod._id === productId)
            ?.clicks.filter((click) => click.productClick).length
        : cardData.find((card) => card.metric === metric)?.total;

    setSelectedTitle(selectedTitle ? `${selectedTitle}: ${selectedTotal}` : "");
  };

  const handleMetricSelect = (metric) => {
    if (selectedMetric === metric) {
      setSelectedMetric(null);
    } else {
      setSelectedMetric(metric);
      if (metric === "productClicks") {
        setShowProductList(true);
      } else {
        setShowProductList(false);
        setSelectedProduct(null);
      }
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product._id);
    setShowProductList(false);
  };

  const { products = [], clicks = [] } = data || {};

  const aggregateTotalClicks = (metric) => {
    return clicks.reduce((acc, click) => {
      if (click[metric]) return acc + 1;
      return acc;
    }, 0);
  };

  const cardData = [
    {
      title: "Product Clicks",
      metric: "productClicks",
      color: "rgba(134, 90, 70, 1)",
      total: products.reduce((acc, product) => acc + product.clicks.length, 0),
    },
    {
      title: "Store Visits",
      metric: "storeClicks",
      color: "rgb(251, 84, 60)",
      total: aggregateTotalClicks("storeClick"),
    },
    {
      title: "Instagram Clicks",
      metric: "instagramClicks",
      color: "rgba(134, 65, 244, 1)",
      total: aggregateTotalClicks("instagramClick"),
    },
    {
      title: "TikTok Clicks",
      metric: "tiktokClicks",
      color: "rgba(255, 99, 132, 1)",
      total: aggregateTotalClicks("tiktokClick"),
    },
    {
      title: "X Clicks",
      metric: "twitterClicks",
      color: "rgba(0, 0, 0, 1)",
      total: aggregateTotalClicks("twitterClick"),
    },
    {
      title: "Snapchat Clicks",
      metric: "snapchatClicks",
      color: "rgba(255, 230, 0, 1)",
      total: aggregateTotalClicks("snapchatClick"),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>My Store Analytics</Text>
      {selectedTitle ? (
        <Text style={styles.selectedTitle}>{selectedTitle}</Text>
      ) : (
        <Text style={styles.selectedTitle}>All</Text>
      )}
      <View style={styles.chartContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#574EFA" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error fetching data</Text>
          </View>
        ) : (
          <LineChart
            data={chartData}
            width={screenWidth - 20}
            height={250}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
            fromZero
            style={styles.chart}
            yAxisInterval={1}
          />
        )}
      </View>
      <FlatList
        data={cardData}
        keyExtractor={(item) => item.metric}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              selectedMetric === item.metric && styles.selectedCard,
            ]}
            onPress={() => handleMetricSelect(item.metric)}
          >
            <View style={styles.cardContent}>
              <View style={[styles.circle, { backgroundColor: item.color }]} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardTotal}>{item.total}</Text>
            </View>
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
                {console.log(item)}
                <Text style={styles.drawerItemText}>{item.title}</Text>
                <Text style={styles.drawerItemText}>{item.clicks?.length}</Text>
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
  decimalPlaces: 0, // Show only whole numbers
  color: (opacity = 1) => `rgba(87, 78, 250, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  yAxisLabel: "", // No label on Y-axis
  yAxisSuffix: "", // No suffix on Y-axis values
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
  selectedTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#574EFA",
    textAlign: "center",
    marginBottom: 10,
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
    alignItems: "center",
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#574EFA",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  cardTotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#574EFA",
    marginLeft: 5,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
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
    height: "40%",
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  drawerItemText: {
    fontSize: 16,
  },
});

export default AnalyticsPage;
