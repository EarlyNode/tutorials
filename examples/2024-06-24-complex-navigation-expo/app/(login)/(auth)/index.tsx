import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";
import { Link } from "expo-router";
import { router } from "expo-router";

export default function LoginView() {
  return (
    <SafeAreaProvider>
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.innerContainer}>
          <ThemedText type="title">Hello from the Login view</ThemedText>

          <Link style={styles.link} href="/(login)/forgot-password">
            Forgot password
          </Link>

          <Button
            onPress={() => {
              router.replace("/(main)");
            }}
          >
            Login
          </Button>
        </SafeAreaView>
      </ThemedView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
});
