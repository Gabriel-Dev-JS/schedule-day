import { View, Text } from "react-native";

export interface CardProps {
  itens: string;
}

export default function Card ({itens}:CardProps) {
  return (
    <View style={{width:"90%", backgroundColor:"blue"}}>
      <Text>
        {itens}
      </Text>
    </View>
  )
}