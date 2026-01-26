import Card from "@/components/Card";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// interface ListaItem {
//   id?:number
//   item:string;
// }

export default function Lista () {

  
  const [itemList, setItemList] = useState<string>("")
  const [listCard, setListCard] = useState<string[]>([])
  
  const enviarLista = () => {
    setListCard(prev => [...prev, itemList])
    setItemList("")
    // setListCard([...listCard, itemList])
    console.log("itemList: ", itemList)
  }

  return (
    <SafeAreaView style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center"}} edges={["top", "bottom"]}>
      <View style={{width:"95%", height:"90%", backgroundColor:"red"}}>
        {listCard?.map((val, index) => (
          <Card key={index} itens={val}/>
        ))}
      </View>
      <View style={{backgroundColor:"white", width:"95%", height:"10%", display:"flex", flexDirection:"row", gap:"12"}}>
        <TextInput 
          onChangeText={(e)=> setItemList(e)}
          value={itemList}
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