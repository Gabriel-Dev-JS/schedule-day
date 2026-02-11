import { TarefasProps } from "@/infra/useQuery";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { SQLiteExecuteAsyncResult } from "expo-sqlite";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

export interface CardProps {
  id: number;
  itens: string;
  funcUpd: (id: number) => Promise<SQLiteExecuteAsyncResult<TarefasProps> | undefined>
  funcDel: (id: number) => Promise<SQLiteExecuteAsyncResult<number> | undefined>
} 

export default function Card ({itens, funcUpd, funcDel, id}:CardProps) {

  const renderActions = () => (
    <View style={styles.containerIcones}>
      <View style={styles.iconeEditar}>
        <TouchableOpacity onPress={() => funcUpd(id)}>
          <EvilIcons name="pencil" size={24} color="#ba8e23" />
        </TouchableOpacity>
      </View>
      <View style={styles.iconeExcluir}>
        <TouchableOpacity onPress={() => funcDel(id)}>
          <EvilIcons name="trash" size={24} color="#950606" />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    // <View style={{width:"90%", backgroundColor:"blue", marginTop:12, height:46}}>
    <Swipeable renderRightActions={renderActions}>
      <View style={styles.container}>
          <Text style={{fontWeight: 600}}>
            {itens}
          </Text>
        {/* <View style={styles.containerTarefas}>
          <Text>
            {itens}
          </Text>
        </View> */}
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // backgroundColor: "white", 
    backgroundColor: "#808080", 
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:12, 
    padding: 20,
    borderRadius: 8
    
  },
  containerTarefas: {
    width: "70%",
    height: "auto",
    backgroundColor: "white",
    textAlign: "center"
  },
  containerIcones: {
    width: "35%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconeEditar: {
    width: "50%",
    height: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  iconeExcluir: {
    width: "50%",
    height: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
})