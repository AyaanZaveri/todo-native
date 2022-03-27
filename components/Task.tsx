import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DateTime } from "luxon";
import Icon from "react-native-vector-icons/Ionicons";
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

  const handleComplete = () => {
    setDoc(tasks, {
      id,
      title,
      date,
      completed: !completed,
    });
  };
  const tasksRef = collection(db, `users/${user?.uid}/tasks`);

  const [tasksSnapshot] = useCollection(tasksRef);

  const handleDelete = async (id: number) => {
    const taskDoc = tasksSnapshot?.docs.find((doc: any) => doc.data().id == id)?.id;
    await deleteDoc(doc(tasksRef, taskDoc));
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.task}>{title}</Text>
        <Text style={styles.date}>{date.seconds}</Text>
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
