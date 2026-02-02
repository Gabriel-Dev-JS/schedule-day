import Card from "@/components/Card";
import { TarefasProps, useDatabase } from "@/infra/useQuery";
import { SQLiteExecuteAsyncResult } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// interface ListaItem {
//   id?:number
//   item:string;
// }

export default function Lista () {

  const database = useDatabase()

  const [tarefa, setTarefa] = useState<string>("")
  const [tarefas, setTarefas] = useState<TarefasProps[]>([])
  const [incremento, setIncremento] = useState<number>(0)

  const list = useCallback(async () => {
      try{
        const response = await database.getAll()
  
        setTarefas(response)
        
        console.log(response)
        return response
      }catch(error:any){
        console.error("error: ", error)
      }
  }, [])


  useEffect(() => {
    list()
  },[list, incremento])


  const create = async (item: Omit<TarefasProps, "id">) => {
    try {
      await database.create(item)
      setIncremento(incremento + 1)
    } catch (error:any) {
      console.error("error: ", error)
    }
  }

  const deletar = async (id: number):Promise<SQLiteExecuteAsyncResult<number> | undefined> => {
    try{
      const response = await database.remove(id)
      setIncremento(incremento + 1)
      console.log("id: ", id)
      console.log("response: ", response)
      return response 
    }catch(error:any){
      console.error("error: ", error)
    }
  }

  const enviarLista = () => {
    
    const tarefas: Omit<TarefasProps, "id"> = {
      tarefa: tarefa as string,
      ativo: 0
    }
    create(tarefas)
    setTarefa("")
  }


  // function deletar(id: number): SQLiteExecuteAsyncResult<number> | undefined {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <SafeAreaView style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center"}} edges={["top", "bottom"]}>
      <View style={{width:"95%", height:"90%", backgroundColor:"red"}}>
        {tarefas?.map((val) => (
          <Card key={val.id} itens={val.tarefa} func={(id) => deletar(id)} id={val.id}/>
        ))}
      </View>
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
    </SafeAreaView>
  )
}