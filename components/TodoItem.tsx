import {View,Text,StyleSheet,Image} from 'react-native'
import {Checkbox} from 'expo-checkbox'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

export enum Priority {
    HIGH = "High",
    MEDIUM = "Medium",
    LOW = "Low"
}

export type TodoItemProps = {
    id : string|number[],
    taskName : string,
    priority : Priority,
    isChecked : boolean
}

export default function TodoItem(props : TodoItemProps){
    const [isChecked,setChecked]= useState(props.isChecked)
    return <View style={style.itemRow}>
            <Text style={{padding:8}}>{props.taskName}</Text>
            <View style={style.iconRow}>
            <Text style={{padding:8}}>{props.priority} </Text>
            <Checkbox style={{marginTop:4}} value={isChecked} onValueChange={setChecked} ></Checkbox>
            <View style={{marginTop:2}}>
            <Icon name="delete-forever" size={24}/>
             </View>         
            </View>  
    </View>
}
const style = StyleSheet.create({
    itemRow : {
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center'
    },
    iconRow : {
        flexDirection:'row',
        justifyContent:'flex-end',
        alignContent:'center',
    }
});