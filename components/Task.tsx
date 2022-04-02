import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import Icon from "react-native-vector-icons/Feather";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

interface Props {
  title: string;
  date: { [key: string]: number };
  completed: boolean;
  id: number;
  tasks: any;
  setTasks: any;
}

const Task = ({ title, date, completed, id, tasks, setTasks }: Props) => {
  const [user] = useAuthState(auth);
  const tasksRef = collection(db, `users/${user?.uid}/tasks`);

  const [clickCount, setClickCount] = useState(0);

  const [tasksSnapshot] = useCollection(tasksRef);
  const docID = tasksSnapshot?.docs.find((doc: any) => doc.data().id == id)?.id;

  const handleComplete = async () => {
    await setDoc(doc(collection(db, `users/${user?.uid}/tasks`), docID), {
      title,
      date,
      id,
      completed: !completed,
    });
  };

  const handleDelete = async (id: number) => {
    await deleteDoc(doc(tasksRef, docID));
  };

  console.log(tasks);

  const dateFormat = (date: number) => {
    if (date) {
      const dateTime = DateTime.fromSeconds(date);
      return DateTime.now().toFormat("MMMM dd, yyyy");
    } else {
      return "The date is not set";
    }
  };

  const editTask = async () => {
    const task = await getDoc(doc(tasksRef, docID));
    setTasks(
      tasks.map((task: any) => {
        if (task.id == id) {
          return {
            title: task.title,
            date: task.date,
            completed: task.completed,
            id: task.id,
            edit: true,
          };
        } else {
          return task;
        }
      })
    );
  };

  useEffect(() => {
    if (clickCount == 2) {
      handleComplete();
      setClickCount(0);
    }
  }, [clickCount]);

  return (
    <Pressable onPress={() => setClickCount(clickCount + 1)}>
      <View
        style={[
          styles.container,
          completed
            ? {
                borderColor: "#22c55e",
              }
            : {
                borderColor: "#94a3b8",
              },
        ]}
      >
        <View style={styles.taskInfo}>
          <View>
            <Text style={styles.task}>{title}</Text>
            <Text style={styles.date}>{dateFormat(date?.seconds)}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Pressable onPress={() => editTask()} style={styles.button}>
            <Icon name="edit" size={18} color="#64748b" />
          </Pressable>
          <Pressable onPress={() => handleDelete(id)} style={styles.button}>
            <Icon name="trash-2" size={18} color="#ef4444" />
          </Pressable>
        </View>
      </View>
    </Pressable>
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
    borderBottomWidth: 3,
    marginBottom: 16,
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
  taskInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginLeft: 5,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
  },
});
