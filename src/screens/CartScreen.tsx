import {View, Text, Button, StyleSheet} from "react-native";
import {RootStackParamList} from "../navigations/DetailsStackNavigator";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "../store/productStore";
type Props = NativeStackScreenProps<RootStackParamList, "Cart">;



export default function CartScreen ({ navigation }: Props) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}><Text style={styles.headerTitleColor}>AURA</Text> SHOP</Text>
                <Ionicons name="cart-outline" size={24} color="black" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    header:{
        width:  "100%",
        alignItems: "center"
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 500
    },
    headerTitleColor: {
        color: "#489d6d"
    }
});