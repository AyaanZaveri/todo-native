import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import Task from "./components/Task";

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
              Add Task
            </Text>
          </Pressable>
        </View>
        <View style={styles.tasks}>
          {tasks.map((task: any) => (
            <Task
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
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    fontSize: 16,
  },
  addTask: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  input: {
    fontSize: 16,
  },
  tasks: {
    marginTop: 24,
  },
});
