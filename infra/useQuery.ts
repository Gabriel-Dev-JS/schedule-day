import { type SQLiteDatabase, useSQLiteContext } from "expo-sqlite";

interface TarefasProps {
  id: number;
  tarefa: string;
  ativo: number;
}


class UseQuery {

  database:SQLiteDatabase
  
  constructor(){
    this.database = useSQLiteContext()
  }

  async create (data: Omit<TarefasProps, "id">) {
    const query = await this.database.prepareAsync(`
      INSERT INTO tarefas (tarefa, ativo) VALUES ($tarefa, $ativo)  
    `)

    try{
      query.executeAsync({
        $tarefa: data.tarefa,
        $ativo: data.ativo
      })
    }catch(error:any){
      console.error("erro: ", error)
    }finally{
      (await query).finalizeAsync()
    }
  }
}

export {UseQuery}