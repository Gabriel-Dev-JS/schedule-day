import { Text, View } from "react-native";

export interface CardProps {
  itens: string;
}

export default function Card ({itens}:CardProps) {

  
  return (
    <View style={{width:"90%", backgroundColor:"blue", marginTop:12, height:46}}>
      <Text>
        {itens}
      </Text>
    </View>
  )
}