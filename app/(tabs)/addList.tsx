import { RefreshContext } from "@/contexts/reloadContext/refreshContext";
import { TarefasProps, useDatabase } from "@/infra/useQuery";
import { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function AddList() {

  const database = useDatabase()
  const context = useContext(RefreshContext)

  const [tarefa, setTarefa] = useState<string>("")

  const create = async (item: Pick<TarefasProps, "tarefa">) => {
    try {
      await database.create(item)

      if (!context) throw new Error("Erro ao de refresh no contexto");
      
      context?.incremento()
    } catch (error:any) {
      console.error("error: ", error)
    }
  }


  const enviarLista = () => {
    
    const tarefas: Pick<TarefasProps, "tarefa"> = {
      tarefa: tarefa as string,
    }

    if(tarefas.tarefa.trim() !== ""){
      create(tarefas)
      setTarefa("")
    }
      
    return null
  }

  return(
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.containerFilho}>
          <TextInput 
            onChangeText={(e)=> setTarefa(e)}
            value={tarefa}
            style={styles.input}
            placeholder="Insira uma tarefa..."
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={enviarLista}
          style={styles.btn}
        >
          <View>
            <Text style={{textAlign:"center", color: "white", fontWeight: "600"}}>Cadastrar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex:1, 
    display:"flex", 
    flexDirection:"column", 
    alignItems:"center", 
    justifyContent:"center",
    backgroundColor: "white"
  },
  container: {
    backgroundColor:"white",
    flex:1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    gap: 12 
  },
  containerFilho: {
    backgroundColor:"white", 
    width:"100%", 
    height:80, 
    display:"flex", 
    flexDirection:"row", 
    gap: 16
  },
  btn: {
    backgroundColor:"green", 
    width:"100%", 
    textAlign: "center",
    borderRadius: 8,
    padding: 18
  },
  input: {
    width:"100%", 
    height: 80, 
    backgroundColor: "#d3d3d3",
    borderRadius: 8,
    padding: 14
  }
})