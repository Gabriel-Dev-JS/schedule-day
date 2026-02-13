import Card from "@/components/Card";
import Modal from "@/components/Modal";
import { RefreshContext } from "@/contexts/reloadContext/refreshContext";
import { TarefasProps, useDatabase } from "@/infra/useQuery";
import { SQLiteExecuteAsyncResult } from "expo-sqlite";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function List() {

  const database = useDatabase()
  const context = useContext(RefreshContext)
  
  const [atualizarTarefa, setAtualizarTarefa] = useState<string>("")
  const [filtroTarefa, setfiltroTarefa] = useState<string>("")
  const [tarefasFiltradas, setTarefasFiltradas] = useState<TarefasProps[]>([])
  const [tarefas, setTarefas] = useState<TarefasProps[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)

  const [tarefa, setTarefa] = useState<string>("")
  // const [tarefa, setTarefa] = useState<string>("")
  const [newTarefa, setnewTarefa] = useState<string>("")
  // const [concluido, setConcluido] = useState<boolean>(false)

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

    const tarefas: Omit<TarefasProps, "concluido"> = {
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

  const done = (id:number) => {
    setTarefas((prev) => prev.map(val => val.id === id ? {...val, concluido: !val?.concluido} : val))
  }
  
  const abrirnModal = async (id:number):Promise<SQLiteExecuteAsyncResult<TarefasProps> | any> => {
    try {
      const response = await database.getId(id)
      let [{tarefa}] = response.map(val => val)
      setTarefa(tarefa)
    }catch(error:any){
      console.error("error: ", error)
    }
    setOpenModal(!openModal)
  }

  const closeModal = () => {
    setnewTarefa("")
    setOpenModal(!openModal)
  }

  console.log(newTarefa)
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <Modal 
        openModal={openModal}
        closeModal={closeModal}
        tarefa={tarefa}
        value={newTarefa}
        alterarTexto={(e:string)=> setnewTarefa(e)}
        executar={()=> updateTarefa(id)}
        titulo="Alterar Tarefa"
      />
      <View style={styles.container}>
        <View>
          <TextInput 
            onChangeText={(e)=> setfiltroTarefa(e)}
            value={filtroTarefa}
            style={styles.input}
            placeholder="🔍    Pesquisar..." 
          />
        </View>
        <View style={{height:"90%"}}>
          {
            filtroTarefa !== "" ? (
              <FlatList
                style={styles.lista}
                data={tarefasFiltradas}
                renderItem={({item})=> <Card 
                key={item.id} 
                id={item.id}
                itens={item.tarefa} 
                funcUpd={(id)=> abrirnModal(id)}
                // funcUpd={(id)=> updateTarefa(id)}
                funcDel={(id)=> deletar(id)} 
                concluido={item.concluido}
                done={(id)=> done(id)}
                />}
              />
            ) : (
              <FlatList
                style={styles.lista}
                data={tarefas}
                renderItem={({item})=> <Card 
                key={item.id} 
                id={item.id}
                itens={item.tarefa} 
                funcUpd={(id)=> abrirnModal(id)}
                // funcUpd={(id)=> updateTarefa(id)}
                funcDel={(id)=> deletar(id)} 
                concluido={item.concluido}
                done={(id)=> done(id)}
                />}
              />
            )
          }
        </View>
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
    flex: 1,
    width:"95%", 
    height:"100%", 
    display: "flex",
    padding: 12,
    gap: 24
  },
  lista: {
    width: "100%"
  },
  input: {
    width:"100%", 
    height: 60, 
    backgroundColor: "#d3d3d3",
    borderRadius: 8,
    padding: 14
  }
})