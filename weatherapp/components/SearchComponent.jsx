import { View, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';

const SearchComponent = (props) => {
  const { searchQuery, searchQueryFun } = props;
  const [text, setText] = useState()

  return (
    <View style={styles.searchcom}>
      <Searchbar
        placeholder="Search City..."
        style={styles.searchInput}
        onChangeText={(text) => setText(text)}
        value={searchQuery}
      />
      <Button
        title="Search"
        onPress={() => searchQueryFun(text)}
        style={styles.button}
      />
    </View>
  );
}

export default SearchComponent;

const styles = StyleSheet.create({
  searchcom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5
  },
  searchInput: {
    width: '75%',
  },
  button: {
    width: '20%',
  },
});
