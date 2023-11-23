import React, { useRef, useCallback, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Stats from "../../components/stats";
import PlanningTask from "../../components/planningTask";

const FirstRoute = () => (
  <View>
    <Text>First Tab</Text>
    <Stats />
  </View>
);

const SecondRoute = () => (
  <View>
    {/* <Text>Second Tab</Text> */}
    <PlanningTask />
  </View>
);

const Analysis = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Stats" },
    { key: "second", title: "Planning" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: 300 }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "blue" }}
          style={{ backgroundColor: "white" }}
          activeColor={"blue"}
          inactiveColor={"black"}
        />
      )}
    />
  );
};

export default Analysis;
