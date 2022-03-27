import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DateTime } from "luxon";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  title: string;
  date: { [key: string]: number };
  completed: boolean;
  id: number;
  tasks: any;
  setTasks: any;
}

const Task = ({ title, date, completed, id, tasks, setTasks }: Props) => {
  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task: any) => task.id !== id));
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.task}>{title}</Text>
        <Text style={styles.date}>
          {date.seconds
            ? DateTime.fromSeconds(date?.seconds).toFormat("MMMM dd, yyyy")
            : null}
        </Text>
      </View>
      <View>
        <Pressable onPress={() => handleDelete(id)}>
          <Icon name="trash" size={18} color="#ef4444" />
        </Pressable>
      </View>
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
    flexDirection: "row",
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
