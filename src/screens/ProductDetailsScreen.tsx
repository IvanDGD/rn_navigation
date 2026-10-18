import React, { useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../navigations/DetailsStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useProductStore } from "../store/productStore";
import { AntDesign, Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

export default function ProductDetailsScreen({ route }: Props) {
  const { id } = route.params;
  const product = useProductStore((state) => state.products.find((item) => item.id === id));
  const addToCart = useProductStore((state) => state.addToCart)
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>No info</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { flex: 1 }]}>
        <Image source={{ uri: product.image }} style={{ width: "100%", height: "100%" }} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.title}>{product.name.toUpperCase()}</Text>
        <View style={styles.priceAndRate}>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.rate}>
            <AntDesign name="star" size={23} style={{ color: "#f3be00" }} />
            {product.rate}
          </Text>
        </View>
        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.sizeTitle}>Size</Text>
        <View style={{ height: 50 }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={product.sizes}
            renderItem={({ item }) => {
              const isSelected = selectedSize === item;
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSelectedSize(item)}
                  style={[styles.sizes, isSelected && styles.selectedSize]}
                >
                  <Text style={[styles.sizeText, isSelected && styles.selectedSizeText]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <Text style={styles.colorTitle}>Color</Text>
        <View style={{ height: 50 }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={product.colors}
            renderItem={({ item }) => {
              const isSelected = selectedColor === item;
              const isWhite = item.toLowerCase() === "#ffffff" || item.toLowerCase() === "white";

              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelectedColor(item)}
                  style={[
                    styles.colors,
                    { backgroundColor: item },
                    isSelected && styles.selectedColor,
                  ]}
                >
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={{alignItems: "center", marginTop: 30}}>
            <TouchableOpacity style={styles.addToCartBtn} onPress={() => (addToCart(product))}><Text style={styles.addToCartBtnText}>ADD TO CART</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    width: "100%",
  },
  productInfo: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  priceAndRate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  price: {
    color: "#06ba8a",
    fontSize: 26,
    fontWeight: "800",
  },
  rate: {
    fontSize: 20,
    fontWeight: "800",
  },
  description: {
    marginVertical: 10,
    fontSize: 14,
    color: "#555",
  },
  sizeTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  colorTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  sizes: {
    borderColor: "#d0cfcf",
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedSize: {
    borderColor: "#06ba8a",
    backgroundColor: "#06ba8a",
  },
  sizeText: {
    color: "#333",
  },
  selectedSizeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  colors: {
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 12,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: "#06ba8a",
    transform: [{ scale: 1.02 }],
  },
  addToCartBtn: {
    backgroundColor: "#06ba8a",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: "50%"
  },
  addToCartBtnText: {
    color: "#ffffff",
    fontWeight: 800,
    fontSize: 21
  }
});