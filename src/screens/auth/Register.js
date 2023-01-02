import { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // todo validation

  const handleSubmit = (e) => {
    alert("Register button pressed");
    // todo api call
  };

  return (
    <View style={styles.main}>
      <Text style={styles.heading}>Sign up</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          keyboardType="default"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <View style={styles.separator} />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          keyboardType="input-password"
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Confirm Password"
          keyboardType="input-password"
          onChangeText={(text) => setPassword2(text)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Sign up" onPress={handleSubmit} color="#43bccd" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 32,
    marginVertical: 24,
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 12,
  },
  input: {
    height: 40,
    minWidth: "75%",
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
  },
  buttonContainer: {
    marginTop: 24,
  },
});

export default RegisterScreen;
