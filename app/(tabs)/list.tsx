import Card from "@/components/Card";
import { RefreshContext } from "@/contexts/reloadContext/refreshContext";
import { TarefasProps, useDatabase } from "@/infra/useQuery";
import { SQLiteExecuteAsyncResult } from "expo-sqlite";
import { useContext, useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function List() {

  const database = useDatabase()
  const context = useContext(RefreshContext)
  
  const [atualizarTarefa, setAtualizarTarefa] = useState<string>("")
  const [filtroTarefa, setfiltroTarefa] = useState<string>("")
  const [tarefasFiltradas, setTarefasFiltradas] = useState<TarefasProps[]>([])
  const [tarefas, setTarefas] = useState<TarefasProps[]>([])

  useEffect(() => {
    async function list() {
      try{
        const response = await database.getAll()
        setTarefas(response)
        console.log(response)
        return response
      }catch(error:any){
        console.error("error: ", error)
      }
    }
    list()
  },[context?.refresh])

  
  const filtro = () => {
   setTarefasFiltradas(tarefas.filter(val => val.tarefa.toUpperCase().includes(filtroTarefa.toUpperCase())))
  }
  
  useEffect(() => {
    filtro()
  }, [filtroTarefa])

  
  const deletar = async (id: number):Promise<SQLiteExecuteAsyncResult<number> | undefined> => {
    try{
      const response = await database.remove(id)
      if (!context) throw new Error("Erro ao de refresh no contexto");
      context?.incremento()
      return response 
    }catch(error:any){
      console.error("error: ", error)
    }
  }
 
  const updateTarefa = async (id:number):Promise<SQLiteExecuteAsyncResult<TarefasProps> | undefined> => {

    const tarefas: Omit<TarefasProps, "ativo"> = {
      id: id,
      tarefa: atualizarTarefa
    }

    try{
      const response = await database.updateTarefa(tarefas)
      if (!context) throw new Error("Erro ao de refresh no contexto");
      context?.incremento()
      return response 
    }catch(error:any){
      console.error("error: ", error)
    }
  }

  return (
    <SafeAreaView style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center"}} edges={["top", "bottom"]}>
      <View style={{width:"95%", height:"100%", backgroundColor:"red"}}>
        <TextInput 
          onChangeText={(e)=> setfiltroTarefa(e)}
          value={filtroTarefa}
          style={{width:"80%", backgroundColor:"blue"}}
          placeholder="digite algo..."
        />
        {
          filtroTarefa !== "" ? (
            <FlatList
              data={tarefasFiltradas}
              renderItem={({item})=> <Card 
              key={item.id} 
              id={item.id}
              itens={item.tarefa} 
              funcUpd={(id)=> updateTarefa(id)}
              funcDel={(id)=> deletar(id)} 
              />}
            />
          ) : (
            <FlatList
              data={tarefas}
              renderItem={({item})=> <Card 
              key={item.id} 
              id={item.id}
              itens={item.tarefa} 
              funcUpd={(id)=> updateTarefa(id)}
              funcDel={(id)=> deletar(id)} 
              />}
            />

          )

        }
      </View>
    </SafeAreaView>
  )
}
