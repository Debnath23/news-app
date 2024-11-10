import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { NewsDataType } from "@/types";
import { Colors } from "@/constants/Colors";
import Skeleton from "./Skeleton";

type Props = {
  newsList: Array<NewsDataType>;
};

const NewsList = ({ newsList }: Props) => {
  return (
    <ScrollView style={styles.container}>
      {newsList.length === 0 ? (
        <>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={styles.itemContainer}>
              <Skeleton
                width={90}
                height={100}
                borderRadius={20}
                style={styles.itemImg}
              />
              <View style={styles.itemInfo}>
                <Skeleton width={"60%"} height={15} />
                <Skeleton width={"80%"} height={15} />
              </View>
            </View>
          ))}
        </>
      ) : (
        newsList.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={{ uri: item.image_url }} style={styles.itemImg} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemCategory}>{item.category}</Text>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
            <View style={styles.itemSourceInfo}>
              <Image
                source={{ uri: item.source_icon }}
                style={styles.itemSourceImg}
              />
              <Text style={styles.itemSourceName}>{item.source_name}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 50,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },

  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 20,
  },

  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
  },

  itemCategory: {
    fontSize: 12,
    color: Colors.darkGrey,
    textTransform: "capitalize",
  },

  itemTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.black,
  },

  itemSourceInfo: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  itemSourceImg: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },

  itemSourceName: {
    fontSize: 10,
    fontWeight: "400",
    color: Colors.darkGrey,
  },
});
