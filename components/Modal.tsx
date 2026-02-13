import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface ModalProps {
    id: number;
    titulo: string;
    tarefa: string;
    openModal: boolean
    value: string;
    alterarTexto: (text:string)=> void
    closeModal: ()=> void;
    executar: (id:number)=> void;
}

export type TarefaModal = {

}


export default function Modal ({titulo, closeModal, executar, tarefa, openModal, id, alterarTexto, value}:ModalProps) {
    return(
        <View style={openModal === true ? styles.containerOpen : styles.containerClose}>
            <View>
                <Text style={styles.titulo}>{titulo}</Text>
            </View>
            <View>
                <TextInput
                    onChangeText={(e)=> alterarTexto(e)}
                    value={value}
                    placeholder={tarefa}
                />
            </View>
            <View style={styles.conatinerBtn}>
                <TouchableOpacity onPress={()=> closeModal()}><Text>Cancelar</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => executar(id)}><Text>Alterar</Text></TouchableOpacity>
            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
    containerOpen: {
        position: "absolute",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
        width: "90%",
        backgroundColor: "#33338e"
    },
    containerClose: {
        height: "80%",
        width: "90%",
        display: "none"
    },
    titulo: {
        fontWeight: 600
    },
    conatinerBtn: {
        display:"flex",
        flexDirection: "row",
        gap: 120
    }
})