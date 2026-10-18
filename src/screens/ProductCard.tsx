import {View, Text, Button, StyleSheet, Image, Touchable, TouchableOpacity} from "react-native";
import {RootStackParamList} from "../navigations/DetailsStackNavigator";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Product} from "../types/ProductType"

type ProductCardProps = {
    product: Product;
    onPress: (id: string | number) => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps){
    return(
        <TouchableOpacity onPress={() => onPress(product.id)}>
            <View style={styles.container}>
                <Image source={{ uri: `${product.image}` }} style={[styles.image, {width: 150, height: 150}]} />
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "column",
        margin: 10
    },
    image:{
        borderRadius: 10
    },
    price: {
        fontWeight: 600,
        fontSize: 16
    },
    name: {
        fontSize: 16
    }
})