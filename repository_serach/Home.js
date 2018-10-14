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
    refreshing: false

  }

  page = 0;

  fetchRepositories(refreshing = false){
    const newPage = refreshing ? 1 :  this.page + 1;
    this.setState({refreshing  })
    fetch(`https://api.github.com/search/repositories?q=react&page=${newPage}`)
      .then(response => response.json())
      .then(({items}) => {
        this.page = newPage;
        if(refreshing){
        this.setState({items , refreshing: false}); 
        }
        else {
          this.setState({items  : [...this.state.items,...items], refresing:false})//スプレット演算子 古いページと新しいページをつなげる
        }
    
    });
    console.log(this.state)

  }
 
  navigateToDetail(item){
    this.props.navigation.navigate('Detail',{item});//画面遷移を行う　'Detail'はApp.jsで決めた名前 keyになっている 第二引数はリンク先のkeyが入る

  }



  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{marginTop : 20}} onPress= {() => this.fetchRepositories() }> 
          <Text>Tacth</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.items}
          renderItem={({item}) => 
            <TouchableOpacity onPress={() => this.navigateToDetail(item) }>{/*Pressされた時に画面遷移を行う*/}
                <Text style={{padding: 20}} >{item.name} </Text>
            </TouchableOpacity>
          }
          keyExtractor={(item,index) => (item.id,item.key) }
          onEndReached={() => this.fetchRepositories() }
          onEndReachedThreshold={0.1}
          onRefresh={() => this.fetchRepositories(true)}  //pullrefreshがいる　画面を下に引っ張るイベントを感知することができる
          refreshing={this.state.refreshing}  //treu の時はonRefreshが呼ばれた後  treuの時に更新ボタンが表示される
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
