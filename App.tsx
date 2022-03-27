import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import Task from "./components/Task";
import Icon from "react-native-vector-icons/Ionicons";
import RNDateTimePicker from "@react-native-community/datetimepicker";

interface Tasks {
  id: number;
  title: string;
  date: number;
  completed: boolean;
}

export default function App() {
  const [text, setText] = useState<string>("");
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const handleTask = () => {
    if (text) {
      setTasks([
        {
          id: Math.round(Math.random() * 10000),
          title: text,
          date: Math.floor(Date.now() / 1000),
          completed: false,
        },
        ...tasks,
      ]);
    }

    setText("");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.headingLg}>Tacit</Text>
        <View style={styles.addTask}>
          <TextInput
            value={text}
            placeholder="Task"
            keyboardType="default"
            onChangeText={(newText) => setText(newText)}
            style={styles.input}
          />
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#4338ca" : "#4f46e5",
              },
              styles.button,
            ]}
            onPress={handleTask}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
              }}
            >
              <Icon name="add" size={24} />
            </Text>
          </Pressable>
        </View>
        <View style={{ opacity: 0, position: "absolute" }}>
          <RNDateTimePicker
            mode="date"
            maximumDate={new Date(2300, 10, 20)}
            minimumDate={new Date(1950, 0, 1)}
            value={new Date()}
            display="inline"
          />
        </View>
        <View style={styles.tasks}>
          {tasks.map((task: any) => (
            <Task
              key={task.id}
              title={task.title}
              date={task.date}
              completed={task.completed}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingHorizontal: 24,
  },
  headingLg: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 24,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  addTask: {
    display: "flex",
    flexDirection: "row",
    marginTop: 24,
  },
  input: {
    fontSize: 16,
    backgroundColor: "#f8fafc",
    flex: 1,
    paddingLeft: 12,
    marginRight: 12,
    borderRadius: 4,
  },
  tasks: {
    marginTop: 24,
  },
});
