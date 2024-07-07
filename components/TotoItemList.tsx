import {StyleSheet, View,FlatList,Text } from "react-native"
import TodoItem, { Priority } from "./TodoItem";
import { TodoItemProps } from "./TodoItem";
import { useState } from "react";

/* const DATA = [
    {   
        id : "a",
        taskName : "Buy Grocries",
        priority : Priority.LOW,
        isChecked : false
    },
    {
        id : "b",
        taskName : "Study React",
        priority : Priority.MEDIUM,
        isChecked : false
    }, 
    {
        id : "c",
        taskName : "Study React Native",
        priority : Priority.MEDIUM,
        isChecked : false
    }, 
    {
        id : "d",
        taskName : "Love Kotlin",
        priority : Priority.HIGH,
        isChecked : true
    },
]
.sort( (a,_)=> a.priority == Priority.MEDIUM ? -1 : 1)
.sort( (a,_) => a.priority == Priority.HIGH ? -1 : 1) */


export default function TodoItemList(itemListProps : {itemList : TodoItemProps[],onDelete : (id:string|number[])=>void}){
   // const list = itemListProps.itemList
    //.sort( (a,_)=> a.priority == Priority.MEDIUM ? -1 : 1).sort( (a,_) => a.priority == Priority.HIGH ? -1 : 1)
    return <FlatList 
            keyExtractor={ (item)=> item.id.toString()}
            data = {itemListProps.itemList}
            renderItem={ ({item})=> 
            <TodoItem 
            id = {item.id}
            taskName={item.taskName}
            priority={item.priority}
            isChecked={item.isChecked}
            onDelete={() => itemListProps.onDelete(item.id)}            />}
            ListHeaderComponent={()=> 
             <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignContent:'center'
                    }}>
                    <Text>Task Name</Text>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'flex-end',
                        alignContent:'center',
                    }}>
                            <Text style={{
                                marginEnd:2
                            }}>Priority</Text>
                            <Text>Done</Text>
                            <Text>   </Text>
                    </View>
            
                </View>
            }

          />
  
}
