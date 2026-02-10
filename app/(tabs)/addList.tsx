import { RefreshContext } from "@/contexts/reloadContext/refreshContext";
import { TarefasProps, useDatabase } from "@/infra/useQuery";
import { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function AddList() {

  const database = useDatabase()
  const context = useContext(RefreshContext)

  const [tarefa, setTarefa] = useState<string>("")

  const create = async (item: Omit<TarefasProps, "id">) => {
    try {
      await database.create(item)

      if (!context) throw new Error("Erro ao de refresh no contexto");
      
      context?.incremento()
    } catch (error:any) {
      console.error("error: ", error)
    }
  }


  const enviarLista = () => {
    
    const tarefas: Omit<TarefasProps, "id"> = {
      tarefa: tarefa as string,
      ativo: 0
    }

    if(tarefas.tarefa.trim() !== ""){
      create(tarefas)
      setTarefa("")
    }
      
    return null
  }

  return(
    <SafeAreaView style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}} edges={["top", "bottom"]}>
      <View style={{backgroundColor:"grey", height:"100%"}}>
        <View style={{backgroundColor:"white", width:"95%", height:"10%", display:"flex", flexDirection:"row", gap:"12"}}>
          <TextInput 
            onChangeText={(e)=> setTarefa(e)}
            value={tarefa}
            style={{width:"80%", backgroundColor:"blue"}}
            placeholder="digite algo..."
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={enviarLista}
            style={{backgroundColor:"green", width:"15%"}}
          >
            <View>
              <Text>Enviar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}