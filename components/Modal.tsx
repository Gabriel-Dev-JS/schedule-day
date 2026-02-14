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
            <View style={styles.containerOpenFilho}>
                <View>
                    <Text style={styles.titulo}>{titulo}</Text>
                </View>
                <View style={{width: "100%", display:"flex", alignItems: "center"}}>
                    <TextInput
                        onChangeText={(e)=> alterarTexto(e)}
                        value={value}
                        placeholder={tarefa}
                        style={styles.inputTexto}
                    />
                </View>
                <View style={styles.conatinerBtn}>
                    <TouchableOpacity onPress={()=> closeModal()} style={styles.btnCancelar}><Text style={{fontWeight: 600, textAlign: "center"}}>Cancelar</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => executar(id)} style={styles.btnEditar}><Text style={{fontWeight: 600, textAlign: "center"}}>Alterar</Text></TouchableOpacity>
                </View>
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
        height: "100%",
        width: "90%",
        backgroundColor: "#ababb4",
        borderRadius: 8
    },
    containerClose: {
        height: "80%",
        width: "90%",
        display: "none"
    },
    containerOpenFilho: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "70%",
        width: "100%",
    },
    titulo: {
        fontWeight: 600,
        fontSize: 30
    },
    conatinerBtn: {
        display:"flex",
        flexDirection: "row",
        gap: 20
    },
    btnEditar: {
        backgroundColor: "green",
        width: "40%",
        padding: 12,
        borderRadius: 8
    },
    btnCancelar: {
        backgroundColor: "#950606",
        width: "40%",
        padding: 12,
        borderRadius: 8
    },
    inputTexto: {
        width: "90%",
        height: 60,
        padding: 24,
        borderRadius: 8,
        backgroundColor: "#ffff"
         
    }
})