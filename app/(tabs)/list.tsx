// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });



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
  const [incremento, setIncremento] = useState<number>(0)

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
  },[context?.refresh, incremento])

  
  const filtro = () => {
   setTarefasFiltradas(tarefas.filter(val => val.tarefa.toUpperCase().includes(filtroTarefa.toUpperCase())))
  }
  
  useEffect(() => {
    filtro()
  }, [filtroTarefa])

  
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
 
  const updateTarefa = async (id:number):Promise<SQLiteExecuteAsyncResult<TarefasProps> | undefined> => {

    const tarefas: Omit<TarefasProps, "ativo"> = {
      id: id,
      tarefa: atualizarTarefa
    }

    try{
      const response = await database.updateTarefa(tarefas)
      setIncremento(incremento + 1)
      console.log("response: ", response)
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
