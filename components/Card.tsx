import { TarefasProps } from "@/infra/useQuery";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { SQLiteExecuteAsyncResult } from "expo-sqlite";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export interface CardProps {
  id: number;
  itens: string;
  funcUpd: (id: number) => Promise<SQLiteExecuteAsyncResult<TarefasProps> | undefined>
  funcDel: (id: number) => Promise<SQLiteExecuteAsyncResult<number> | undefined>
} 

export default function Card ({itens, funcUpd, funcDel, id}:CardProps) {

  
  return (
    // <View style={{width:"90%", backgroundColor:"blue", marginTop:12, height:46}}>
    <View style={styles.container}>
      <View style={styles.containerTarefas}>
        <Text>
          {itens}
        </Text>
      </View>
      <View style={styles.containerIcones}>
        <View>
          <TouchableOpacity onPress={() => funcUpd(id)} style={{width:"30%"}}>
            <EvilIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => funcDel(id)} style={{width:"30%"}}>
            <EvilIcons name="trash" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "blue", 
    marginTop:12, 
    height: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
    
  },
  containerTarefas: {
    width: "70%",
    height: "auto",
    backgroundColor: "white",
    textAlign: "center"
  },
  containerIcones: {
    width: "20%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    backgroundColor:"green"
  }
})