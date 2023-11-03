import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { format, parseISO } from "date-fns";
import styles from "./style";

const RealTimeFormatDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = format(currentDate, "EEEE, d MMMM y");
  return (
    <View>
      <Text style={styles.Text2}>{formattedDate}</Text>
    </View>
  );
};

export default RealTimeFormatDate;
