import { SQLiteExecuteAsyncResult } from "expo-sqlite";
import { Text, TouchableOpacity, View } from "react-native";

export interface CardProps {
  id: number;
  itens: string;
  func: (id: number) => Promise<SQLiteExecuteAsyncResult<number> | undefined>
} 

export default function Card ({itens, func, id}:CardProps) {

  
  return (
    <View style={{width:"90%", backgroundColor:"blue", marginTop:12, height:46}}>
      <View>
        <Text>
          {itens}
        </Text>
      </View>
      <TouchableOpacity onPress={() => func(id)} style={{width:"30%"}}>
        <Text>Deletar</Text>
      </TouchableOpacity>
    </View>
  )
}