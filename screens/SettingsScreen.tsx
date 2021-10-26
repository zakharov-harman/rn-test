import React from "react";
import { Button, Text, View, FlatList, Switch } from "react-native";
import tailwind from "tailwind-rn";

const Cat = () => {
  return (
    <View style={tailwind("p-2 bg-gray-200")}>
      <View style={tailwind("bg-white px-8 pt-6 pb-8 mb-4")}>
        <Button onPress={() => {}} title="Delete all data"></Button>
      </View>

      <View style={tailwind("bg-white px-8 pt-6 pb-8 mb-4")}>
        <FlatList
          data={[
            {
              name: "EN",
            },
            {
              name: "RU",
            },
          ]}
          renderItem={({ item }) => (
            <View>
              <Text style={tailwind("mb-2")}>{item.name}</Text>
              <Button onPress={() => {}} title="Set"></Button>
            </View>
          )}
        />
      </View>

      <View style={tailwind("bg-white px-8 pt-6 pb-8 mb-4 flex flex-row items-start")}>
        <Switch style={tailwind("mr-2")}/>

        <Text>
          Dark mode
        </Text>
      </View>
    </View>
  );
};

export default Cat;
