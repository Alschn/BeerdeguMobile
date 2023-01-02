import { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useAuth } from "../../context/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // todo validation

  const handleSubmit = (e) => {
    alert("Login button pressed");
    // todo api call
  };

  return (
    <View style={styles.main}>
      <Text style={styles.heading}>Sign in</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="input-email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          keyboardType="input-password"
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Sign in" onPress={handleSubmit} color="#43bccd" />
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

export default LoginScreen;
