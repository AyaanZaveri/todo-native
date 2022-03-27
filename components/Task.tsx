import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface Props {
  title: string;
  date: number;
  completed: boolean;
}

const Task = ({ title, date, completed }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.task}>{title}</Text>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 10,
  },
  task: {
    fontSize: 16,
    margin: 10,
    fontWeight: "bold",
  },
});
