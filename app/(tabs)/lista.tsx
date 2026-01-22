import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export default function Lista () {
  return (
    <SafeAreaView style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center"}} edges={["top", "bottom"]}>
      <View style={{width:"90%", height:"90%", backgroundColor:"red"}}>
        <Text style={{color:"white"}}>Hello world</Text>
      </View>
    </SafeAreaView>
  )
}