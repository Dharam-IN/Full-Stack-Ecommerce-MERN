import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

export default function App() {
  const [todoList, setTodoList] = useState([]);

  function taskinput(tasktext){
    setTaskValue(tasktext)
  }

  function addTask(taskvalue){
    if(taskvalue !== ""){
      setTodoList([...todoList, {text: taskvalue, id: Math.random().toString()}]);
    }else{
      alert("Bhai pahle Task to likh")
      return false
    }
  }

  function deleteTask(id){
    console.log(todoList)
    console.log(id)
    const filterList = todoList.filter((list) => list.id != id);
    console.log(filterList);
    setTodoList(filterList)
  }

  return (
    <View style={styles.container}>
      <TodoInput buttonPress={addTask}/>
      <FlatList style={styles.todoListView} data={todoList} renderItem={(data) => {
        return(
          <TodoList text={data} delete={deleteTask}/>
        )
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20
  },
  
  todoListView: {
    marginTop: 20
  }
});
