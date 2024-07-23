import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart, ProgressChart } from "react-native-chart-kit";




const data = {
  labels: ["Swim", "Bike", "Run"], // optional
  data: [0.4, 0.6, 0.8]

};

const Analytics = () => {
   
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)  
    console.log(sevenDaysAgo);
  
    return (
      <View
    style={{
      flex: 1,
      // paddingHorizontal: 5,
      // paddingVertical: 5,
      // justifyContent: "flex-start",
 
    }}
  >

 <View style={{paddingHorizontal:12}}>
  <Text>Bezier Line Chart</Text>
  <ProgressChart
    data={
  
    data}
    width={Dimensions.get("window").width-24 } // from react-native
    height={220}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#574EFA",
      backgroundGradientTo: "#574EAF",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "gray"
      }
    }}
    bezier
    style={{
      borderRadius: 16
    }}
  />
</View>
  </View>
    );
  };

export default Analytics;

const styles = StyleSheet.create({});
