import Card, { CardProps } from "@/components/Card"
import { FC, ReactNode, useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Lista () {

  const [itemList, setItemList] = useState<string>("")
  const [listCard, setListCard] = useState<string[]>([])
  
  const enviarLista = () => {
    setListCard(prev => [...prev, itemList])
    // setListCard([...listCard, itemList])
    console.log("itemList: ", itemList)
  }

  return (
    <SafeAreaView style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center"}} edges={["top", "bottom"]}>
      <View style={{width:"95%", height:"90%", backgroundColor:"red"}}>
        {/* <Text style={{color:"white"}}>Hello world</Text>
        <Text style={{color:"white"}}>{teste}</Text> */}
        {listCard?.map((val, index) => (
          <Card key={index} itens={val}/>
        ))}
      </View>
      <View style={{backgroundColor:"white", width:"95%", height:"10%", display:"flex", flexDirection:"row", gap:"12"}}>
        <TextInput 
          onChangeText={(e)=> setItemList(e)}
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