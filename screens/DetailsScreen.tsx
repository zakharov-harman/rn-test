import React from "react";
import {
  Button,
  Text,
  ScrollView,
  TextInput,
  View,
  SafeAreaView,
  Image,
  VirtualizedList,
} from "react-native";
import tailwind from "tailwind-rn";

const DATA = [
  {
    name: "Feels like",
    value: "+1&nbsp;&#8451;",
  },
  {
    name: "Humidity",
    value: "60%",
  },
  {
    name: "Pressure",
    value: "800",
  },
];

function DetailsScreen() {
  return (
    <ScrollView style={tailwind("bg-gray-200")}>
      <View
        style={tailwind(
          "w-full h-full backdrop-filter backdrop-grayscale backdrop-blur"
        )}
      >
        <Image
          style={tailwind("object-cover w-full h-full")}
          source={require("../assets/cities/moskow.webp")}
        />
      </View>

      <View style={tailwind("p-2")}>
        <Text style={tailwind("")}>Moskow</Text>
        <Text style={tailwind("w-15")}>+1&nbsp;&#8451;</Text>
        <Image
          style={tailwind("w-10 h-10 mr-2")}
          source={require("../assets//weather/weather_fullmoon.svg")}
        />

        <Text style={tailwind("")}>Raining</Text>

        <Text style={tailwind("")}>Min. +1&nbsp;&#8451;</Text>
        <Text style={tailwind("")}>Max. +1&nbsp;&#8451;</Text>
      </View>
    </ScrollView>
  );
}

export default DetailsScreen;
