// import * as SQLite from 'expo-sqlite';
import { type SQLiteDatabase } from 'expo-sqlite';

// const db = await SQLite.openDatabaseAsync('todo');


const connection = async (dastabase: SQLiteDatabase) => {
 await dastabase.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tarefa TEXT NOT NULL,
        ativo INTEGER DEFAULT 0
    )
`)
}


export default connection;

// await db.execAsync(`
//     CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY NOT NULL, tarefa TEXT)
// `)

// const insert = await db.prepareAsync(`
//     INSERT INTO tarefas (tarefa) values ($value)
// `)

// const excluir = await db.prepareAsync(`
//     DELETE FROM tarefas WHERE id = $id
// `)

// export const tarefa = async (tarefa:string) => {
//     try {
//         await insert.executeAsync({$value: tarefa})
//     } finally {
//         await insert.executeAsync();
//     }
// }

// export const excluirTarefa = async (id:number) => {
//     try {
//         await excluir.executeAsync({$id: id})
//     } finally {
//         await excluir.finalizeAsync()
//     }
// }






// ✅ Versão corrigida e organizada
// import * as SQLite from 'expo-sqlite';

// let db: SQLite.SQLiteDatabase;

// export const initDB = async () => {
//   db = await SQLite.openDatabaseAsync('todo.db');

//   await db.execAsync(`
//     CREATE TABLE IF NOT EXISTS tarefas (l
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       tarefa TEXT NOT NULL
//     );
//   `);
// };

// export const inserirTarefa = async (tarefa: string) => {
//   const stmt = await db.prepareAsync(`
//     INSERT INTO tarefas (tarefa) VALUES ($tarefa)
//   `);

//   try {
//     await stmt.executeAsync({ $tarefa: tarefa });
//   } finally {
//     await stmt.finalizeAsync();
//   }
// };

// export const excluirTarefa = async (id: number) => {
//   const stmt = await db.prepareAsync(`
//     DELETE FROM tarefas WHERE id = $id
//   `);

//   try {
//     await stmt.executeAsync({ $id: id });
//   } finally {
//     await stmt.finalizeAsync();
//   }
// };

// 📌 Como usar no app (exemplo)
// useEffect(() => {
//   initDB();
// }, []);

// 🧠 Dica extra

// Se você não precisa de prepareAsync, pode usar direto:

// await db.runAsync(
//   'INSERT INTO tarefas (tarefa) VALUES (?)',
//   tarefa
// );


// Mais simples para CRUD básico 😉