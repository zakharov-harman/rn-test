import { API_KEY } from "@env";

import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  ScrollView,
  TextInput,
  View,
  FlatList,
  Image,
} from "react-native";
import tailwind from "tailwind-rn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getCityRecords = async () => {
  try {
    let savedIds = await AsyncStorage.getItem("savedItems");
    return JSON.parse(savedIds);
  } catch (e) {}
};
const getCityData = async (list) => {
  let promises = [];
  list.forEach((item) => {
    promises.push(
      new Promise(async (resolve) => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${item.lat}&lon=${item.lon}&appid=${API_KEY}&units=metric`,
          {
            method: "GET",
          }
        );
        resolve(await response.json());
      })
    );
  });
  return await Promise.allSettled(promises);
};

const getList = async () => {
  const data = await getCityRecords();
  return (await getCityData(data)).map((item) => item.value);
};

const findIcon = (item) => {
  return require("../assets//weather/weather_fullmoon.svg")
}

const HomeScreen = ({ navigation }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const req = async () => {
      setList(await getList());
    };
    req();
  }, []);

  return (
    <ScrollView style={tailwind("p-2 bg-gray-200")}>
      <View style={tailwind("mb-2")}>
        <Button onPress={() => navigation.navigate("Add")} title="Add"></Button>
      </View>
      <View style={tailwind("mb-2")}>
        <Button
          style={tailwind("mb-2")}
          onPress={() => navigation.navigate("Settings")}
          title="Settings"
        ></Button>
      </View>

      <FlatList
        data={list}
        renderItem={({ item }) => (
          <View
            onClick={() => navigation.navigate("Details")}
            style={tailwind(
              "flex flex-row items-center bg-white p-4 mb-2 rounded "
            )}
          >
            <Text style={tailwind("flex-grow mr-2")}>
              {item.name} {item.clouds.all}
            </Text>
            <Image
              style={tailwind("w-10 h-10 mr-2")}
              source={findIcon(item)}
            />
            <Text style={tailwind("w-15")}>{item.main.temp}&nbsp;&#8451;</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default HomeScreen;
