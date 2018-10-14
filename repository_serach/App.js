/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, 
        StyleSheet, 
        Text,
        View,
        TouchableOpacity,
        FlatList,
        onEndReached,//描画の下に行った時に呼び出す
        onEndReachedThreshold,//描画割合を指定する
      } from 'react-native';




export default class App extends Component {
  state = {
    items: [],

  }

  page = 0;

  fetchRepositories(){
    const newPage = this.page + 1
    fetch(`https://api.github.com/search/repositories?q=react&page=${newPage}`)
      .then(response => response.json())
      .then(({items}) => {
        this.page = newPage;
        this.setState({items: [...this.state.items,...items]}) //スプレット演算子 古いページと新しいページをつなげる

    
    });
    console.log(this.page)

  }
 


  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{marginTop : 20}} onPress= {() => this. fetchRepositories() }>
          <Text>Tacth</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.items}
          renderItem={({item}) => <Text style={{marginTop: 20}}>{item.name} </Text>}
          keyExtractor={(item,index) => item.id }
          onEndReached={() => this.fetchRepositories() }
          onEndReachedThreshold={0.1}
        />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5FCFF',
  },
 
});
