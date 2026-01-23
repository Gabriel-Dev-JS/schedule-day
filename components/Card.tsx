import { Text, View } from "react-native";

export interface CardProps {
  itens: string;
  key:number;
}

export default function Card ({itens, key}:CardProps) {

  

  return (
    <View style={{width:"90%", backgroundColor:"blue", marginTop:12, height:46}} key={key}>
      <Text>
        {itens}
      </Text>
    </View>
  )
}