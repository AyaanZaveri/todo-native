import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DateTime } from "luxon";

interface Props {
  title: string;
  date: number;
  completed: boolean;
}

const getUnixTime = (date: DateTime) => {
  return DateTime.fromSeconds(date.toSeconds()).toFormat("MMMM dd, yyyy");
};

const Task = ({ title, date, completed }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.task}>{title}</Text>
      <Text style={styles.date}>{getUnixTime(DateTime.fromSeconds(date))}</Text>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  task: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 6,
  },
  date: {
    fontSize: 12,
    color: "#64748b",
  },
});
