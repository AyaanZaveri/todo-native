import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/Ionicons";
import { SvgUri } from "react-native-svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const [user] = useAuthState(auth);

  const usersRef = collection(db, "users");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home" as any);
      } else {
        navigation.navigate("Login" as any);
      }
    });

    return unsubscribe;
  }, []);

  const handleRegister = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Registered as: ", user.email);
      })
      .catch((error) => {
        setError(error.message);
      });

    await setDoc(doc(usersRef, user?.uid), {
      email: user?.email,
      displayName: name,
      uid: user?.uid,
      photoURL: user?.photoURL,
    });
  };

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in as: ", user.email);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    if (email == "" || password == "") {
      setError("Please fill in all fields!");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
    } else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
      setError("Invalid email!");
    } else {
      setError("");
    }
  }, [email, password]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Text style={styles.headingMd}>{showLogin ? "Register" : "Login"}</Text>
        {showLogin ? (
          <>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={(text: string) => setName(text)}
              style={[styles.input, { marginBottom: 6 }]}
              autoCapitalize="none"
            />
          </>
        ) : null}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          style={styles.input}
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Icon
              name={showPassword ? "ios-eye" : "ios-eye-off"}
              size={24}
              color="#2563eb"
            />
          </Pressable>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            style={styles.input}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={showLogin ? handleRegister : handleLogin}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#1d4ed8" : "#2563eb",
            },
            styles.button,
          ]}
        >
          <Text style={styles.buttonText}>
            {showLogin ? "Register" : "Login"}
          </Text>
        </Pressable>
        <View style={styles.loginSwitch}>
          <Text style={styles.switchText}>Login</Text>
          <Switch
            value={showLogin}
            onValueChange={() => setShowLogin(!showLogin)}
          />
          <Text style={styles.switchText}>Register</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headingLg: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
  inputContainer: {
    width: "80%",
    flexDirection: "column",
  },
  input: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    width: "100%",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  button: {
    width: "100%",
    padding: 12,
    marginTop: 6,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    marginTop: 6,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    zIndex: 1,
  },
  error: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  switchText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 12,
  },
  headingMd: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
});
