import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";
import Skeleton from "@/components/Skeleton";
import axios from "axios";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [category, setCategory] = useState("all");
  const [breakingNews, setBreakingNews] = useState<any[]>([]);
  const [trendingNews, setTrendingNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBreakingNews = async () => {
    setIsLoading(true);

    try {
      const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&category=${category}&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(url);

      if (response && response.data) {
        setBreakingNews(response.data.results);
      }
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendingNews = async () => {
    setIsLoading(true);

    try {
      const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&category=${category}&image=1&removeduplicate=1&size=10`;
      const response = await axios.get(url);

      if (response && response.data) {
        setTrendingNews(response.data.results);
      }
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBreakingNews();
    fetchTrendingNews();
  }, [category]);

  console.log("Breaking news: ", breakingNews);
  console.log("Trending News: ", trendingNews);

  const onCatChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      {isLoading ? <Skeleton /> : <BreakingNews newsList={breakingNews} />}
      <Categories onCategoryChange={onCatChange} />
      <NewsList newsList={trendingNews} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
});
