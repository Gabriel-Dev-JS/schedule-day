import { useSQLiteContext } from "expo-sqlite";

export interface TarefasProps {
  id: number;
  tarefa: string;
  concluido: boolean;
}


const useDatabase = () => {

  const database = useSQLiteContext()


  const create = async (data: Omit<TarefasProps, "id" | "concluido">) => {
    
    const query = await database.prepareAsync(`
      INSERT INTO tarefas (tarefa) VALUES ($tarefa)  
    `)
  
    try{
      const result = await query.executeAsync({
        $tarefa: data.tarefa,
      })

      return result
    }catch(error:any){
      console.error("erro: ", error)
    }finally{
      await query.finalizeAsync()
    }
  }

  const getAll = async () => {
    const query = `SELECT * FROM tarefas`
    try{
      const response = await database.getAllAsync<TarefasProps>(query)
      return response ?? []
    }catch(error:any){
      console.error("error: ", error)

      return []
    }
  }
  
  const getId = async (id:number) => {
    // const query = await database.prepareAsync(`SELECT * FROM tarefas WHERE id=$id`)
    const query = `SELECT * FROM tarefas WHERE id=${id}`
    try{
      const response = await database.getAllAsync<TarefasProps>(query)
      return response ?? undefined
    }catch(error:any){
      console.error("error: ", error)

      return []
    }
  }

  const remove = async (id: number) => {
    const query = await database.prepareAsync(`DELETE FROM tarefas WHERE id = $id`) 
    try{
      const response = await query.executeAsync<number>({$id: id})
      return response
    }catch(error:any){
      console.error("error: ", error)
    }finally{
      await query.finalizeAsync()
    }
  }
  
  const updateTarefa = async (data: Omit<TarefasProps, "concluido">) => {
    const query = await database.prepareAsync(`UPDATE tarefas SET tarefa=$tarefa WHERE id=$id`) 
    try{
      const response = await query.executeAsync<TarefasProps>({$id: data.id, $tarefa: data.tarefa})
      return response
    }catch(error:any){
      console.error("error: ", error)
    }finally{
      await query.finalizeAsync()
    }
  }


  return {create, getAll, remove, updateTarefa, getId}
} 
  


export { useDatabase };

