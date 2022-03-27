import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Task from "../components/Task";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

interface Tasks {
  id: number;
  title: string;
  date: number;
  completed: boolean;
}

const Home = () => {
  const [text, setText] = useState<string>("");
  const [tasks, setTasks] = useState<any>([]);

  const [user] = useAuthState(auth);

  const tasksRef = collection(db, `users/${user?.uid}/tasks`);

  const [tasksSnapshot] = useCollection(tasksRef);

  useEffect(() => {
    if (tasksSnapshot) {
      setTasks(
        tasksSnapshot.docs.map((doc: any) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    }
  }, [tasksSnapshot]);

  console.log(tasks);

  const handleTask = () => {
    if (text) {
      addDoc(tasksRef, {
        title: text,
        date: serverTimestamp(),
        completed: false,
        id: Math.random(),
      });
    }

    setText("");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.headingLg}>Tacit</Text>
        <Text>{user?.email}</Text>
        <Button title="Logout" onPress={() => signOut(auth)} />
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
        <View style={styles.tasks}>
          {tasks.map((task: any) => (
            <Task
              tasks={tasks}
              key={task.id}
              title={task.title}
              date={task.date}
              completed={task.completed}
              id={task.id}
              setTasks={setTasks}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

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
    borderRadius: 100,
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
