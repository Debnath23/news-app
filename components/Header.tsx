import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={require("@/assets/images/profile-pic.jpeg")}
          style={styles.profileImg}
          resizeMode="contain"
        />

        <View>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.userName}>Debnath Mahapatra!</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="notifications-outline" size={24} color={Colors.black} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    textAlign: "center",
  },

  welcomeText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },

  userName: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.black,
  },
});
