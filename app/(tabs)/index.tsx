import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchPets } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import SearchBar from "../../components/SearchBar";
export default function Index() {
  const router = useRouter();
  const {
    data: animals,
    loading: animloading,
    error: animerror,
  } = useFetch(() => fetchPets({ query: "" }));

  console.log(animals);
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5">
        <Image source={icons.logo} className="mt-16 mb-5 w-12 h-10 mx-auto" />
        {animloading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self center"
          />
        ) : animerror ? (
          <Text>
            Error:{animerror?.message}.Failed to fetch in the Index page
          </Text>
        ) : (
          <View>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            <Text className="text-lg text-white font-bold mt-5 mb-3">Pets</Text>
            <FlatList
              data={animals}
              renderItem={({ item }) => (
                <Text className="text-white">{item.name}</Text>
              )}
              keyExtractor={(item) => item.id.toString()}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                marginBottom: 10,
                gap: 20,
                paddingRight: 5,
              }}
              className="mt-2 pb-32"
              numColumns={3}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
