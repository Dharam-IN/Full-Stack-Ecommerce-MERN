import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

const todoList = (props) => {
  console.log("props.text", props.text)
  function deleteTodo(id){
    props.delete(id)
  }

  return (
    <View style={styles.todoListView}>
      <Text key={props.text.item.id} style={styles.todoList}>{props.text.item.text}</Text>
      <Button title='X' onPress={() => deleteTodo(props.text.item.id)}/>
    </View>
  )
}

const styles = StyleSheet.create({
    todoList: {
      fontSize: 20,
      textTransform: "capitalize",
    },
    todoListView: {
      backgroundColor: "#f2f5f9",
      color: "black",
      padding: 10,
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10
    }
})

export default todoList