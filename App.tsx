import { StatusBar } from 'expo-status-bar';
import {useState} from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import TodoItemList from './components/TotoItemList';
import { Priority, TodoItemProps } from './components/TodoItem';
import Checkbox from 'expo-checkbox';
import uuid from 'react-native-uuid';

export default function App() {
  const [newTask,onChangeText] = useState("")
  const [taskId,setTaskId]= useState(uuid.v4())
  const [tasklist,updateTaskList]= useState<TodoItemProps[]>([])
  const [checkBoxesState, updateCheckBoxesState] = useState<boolean[]>([true,false,false])
  const handleOnPress = (name :String) =>{
    const emptyCheckbox = checkBoxesState.every( value => !value)
    if(!name)
      {
        Alert.alert('Task Name Error','Task Name is empty ,\n Please enter name',[
          {
            text:'Ok'
          }
        ])
        return
      }
    else if(emptyCheckbox){
      Alert.alert('Priority Error','No Priority Set ,\n Please set Priority',[
        {
          text:'Ok'
        }
      ])
      return
      }

    const selectedCheckBox = checkBoxesState.findIndex( (ch) => ch)  
    let cPrirority = Priority.HIGH;
    if(selectedCheckBox){
      if(selectedCheckBox == 0)
        cPrirority = Priority.HIGH
      else if(selectedCheckBox == 1)
        cPrirority = Priority.MEDIUM
      else 
      cPrirority = Priority.LOW
    }
    var newList = [...tasklist]
    newList.push({
      id:taskId,
      taskName:`${name}`,
      priority:cPrirority,
      isChecked:false,
      onDelete:handleDeleteItem
    });
    setTaskId( uuid.v4());
    onChangeText("")
    updateTaskList(newList)
  }
  const handleCheckBoxChange = (index : number,isChecked: boolean)=>{
    var booleanArray = [...checkBoxesState]
    booleanArray.fill(false)
    booleanArray[index] = isChecked
    updateCheckBoxesState(booleanArray)
  }

  const handleDeleteItem = (id:String|number[])=>{
    var newTaskList = [...tasklist]
    const deleteIndex = newTaskList.findIndex( (item)=> item.id == id)
    newTaskList.splice(deleteIndex,1)
    updateTaskList(newTaskList)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputRow}> 
          <TextInput  style={styles.input} value={newTask} onChangeText={onChangeText} placeholder='Enter New Task'/>
          <TouchableOpacity style={styles.button} onPress={ () => handleOnPress(newTask)}>
            <Text style={styles.textStyle}>Add Task</Text>
            </TouchableOpacity>  
      </View>
      <View style={styles.priorityRow}>
        <View style={styles.inputRow}>
        <Checkbox value={checkBoxesState[0]} onValueChange={ (change)=> {
          handleCheckBoxChange(0,change)
        }}/> 
        <Text> High</Text>
        </View>
        <View style={styles.inputRow}>
        <Checkbox value={checkBoxesState[1]} onValueChange={ (change)=> {
          handleCheckBoxChange(1,change)
        }}/> 
        <Text> Medium</Text>
        </View>
        <View style={styles.inputRow}>
        <Checkbox value={checkBoxesState[2]} onValueChange={ (change)=> {
          handleCheckBoxChange(2,change)
        }}/>  
        <Text> Low</Text>
        </View>
      </View>
      <TodoItemList itemList={tasklist} onDelete={(id : String|number[])=> handleDeleteItem(id)}></TodoItemList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:20,
    marginTop:40,
  },
  input: {
    flex:1,
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginEnd:10
  },
  inputRow: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
  },
  textStyle : {
    color:'white'
  },
  priorityRow :{
    margin:10,
    flexDirection:'row',
    justifyContent:'space-around'
  }
});
