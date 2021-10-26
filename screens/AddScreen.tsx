import { API_KEY } from "@env";

import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, Text, View, FlatList, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import tailwind from "tailwind-rn";

import SearchForm from "../components/search/SearchForm";

const Cat = ({navigation}) => {
  const [search, setSearch] = useState("");
  const [cities, updateCitiesState] = useState([]);

  useEffect(() => {
    const req = async (value) => {
      let response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?&q=${value}&appid=${API_KEY}&lang=ru`,
        {
          method: "GET",
        }
      );
      updateCitiesState(await response.json());
    };
    req(search);
  }, [search]);

  const setCityRecord = async (item) => {
    try {
      let savedItems = await AsyncStorage.getItem('savedItems')
      savedItems = JSON.parse(savedItems)
      
      if (
        Array.isArray(savedItems) &&
        savedItems.length
      ) {
        savedItems.push(item)
      } else {
        savedItems = [item]
      }
      
      const jsonValue = JSON.stringify(savedItems)
      await AsyncStorage.setItem('savedItems', jsonValue)
    } catch (e) {
      console.log('123123', e)
    }
    navigation.navigate("Home")
  };

  return (
    <ScrollView style={tailwind("p-2 bg-gray-200")}>
      <View style={tailwind("bg-white px-8 pt-6 pb-8 mb-4")}>
        <Text style={tailwind("mb-2")}>Add new city to list</Text>

        <form>
          <SearchForm
            onChangeHandler={(value) => {
              setSearch(value);
            }}
          />
        </form>
      </View>

      {cities.length ? (
        <View style={tailwind("bg-white px-8 pt-6 pb-8 mb-4")}>
          <FlatList
            data={cities}
            renderItem={({ item }) => (
              <View>
                <Text style={tailwind("mb-2")}>
                  {item.name}, {item.country}
                </Text>
                <Button
                  onPress={() => setCityRecord({
                    lat: item.lat,
                    lon: item.lon
                  })}
                  title="Set"
                ></Button>
              </View>
            )}
          />
        </View>
      ) : ''}
    </ScrollView>
  );
};

export default Cat;
