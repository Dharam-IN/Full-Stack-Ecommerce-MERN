import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'

const TodoInput = (props) => {

    const [taskvalue, setTaskValue] = useState('');

    function taskinput(tasktext){
        setTaskValue(tasktext)
    }

    function onPress(){
        props.buttonPress(taskvalue)
        setTaskValue()
    }

  return (
    <View style={styles.todoInput}>
        <TextInput style={styles.textInput} value={taskvalue} onChangeText={taskinput} placeholder='Please Enter a task'/>
        <Button title='Add Task' onPress={onPress}/>
    </View>
  )
}

const styles = StyleSheet.create({
    todoInput: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        gap: 5,
        borderBottomWidth: 1,
        paddingBottom: 20,
        borderBottomColor: "black"
    },
    textInput: {
        width: "80%",
        borderWidth: 1,
        borderColor: "black",
        paddingLeft: 10
    },
})

export default TodoInput