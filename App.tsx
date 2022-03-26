/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";

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
        {tasks.map((task: any) => (
          <Text key={task.id} style={styles.paragraph}>
            {task.title}
          </Text>
        ))}

        <View style={styles.addTask}>
          <TextInput
            value={text}
            placeholder="Task"
            keyboardType="default"
            onChangeText={(newText) => setText(newText)}
          />
          <Pressable style={styles.button} onPress={handleTask}>
            <Text
              style={{
                color: "white",
              }}
            >
              Add Task
            </Text>
          </Pressable>
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
    backgroundColor: "#4f46e5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  addTask: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
});
