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
        TextInput,
        Image,
        AppState,
      } from 'react-native';


export default class App extends Component {
  state = {
    items: [],
    refreshing: false,
    text : ''

  }

  page = 0;

  fetchRepositories(refreshing = false){
    const newPage = refreshing ? 1 :  this.page + 1;
    this.setState({refreshing  })
    fetch(`https://api.github.com/search/repositories?q=${this.state.text}&page=${newPage}`)
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
    //console.log(this.state)

  }
 
  navigateToDetail(item){
    this.props.navigation.navigate('Detail',{item});//画面遷移を行う　'Detail'はApp.jsで決めた名前 keyになっている 第二引数はリンク先のkeyが入る

  }

  //バックグランドで処理をさせるイベント
  componentDidMount() {
    AppState.addEventListener('change',this.onChangeState);
    console.log("Did")

  }


  //バックグランドで処理をさせるイベント
  componentWillUnmount() {
    AppState.removeEventListener('change',this.onChangeState);
    console.log("Will")
  }

  //componentDidMountのchangeイベントが発生した時に呼び出される　アロー演算子で書くことで参照をthisでできて楽
  onChangeState = (appState) =>{
    //バックグランドからフロントグラウンドした時にfetchRepositoriesを呼ぶことで最新の情報を表示する
    if(appState === 'active'){
        this.fetchRepositories(true);
    }

  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.inputWrapper}>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({text})}/>
          {/*fetchRepositoriesをtrueにすることで検索が始まる*/}
          <TouchableOpacity onPress={() => this.fetchRepositories(true) }> 
              <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>

      </View>
        {/* <TouchableOpacity style={{marginTop : 20}} onPress= {() => this.fetchRepositories() }> 
          <Text>Tacth</Text>
        </TouchableOpacity> */}
        <FlatList
          data={this.state.items}
          renderItem={({item}) => 
            <TouchableOpacity style={{padding: 20}} onPress={() => this.navigateToDetail(item) }>{/*Pressされた時に画面遷移を行う*/}
                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}} >{item.name} </Text>
                <View style={{flexDirection: 'row'  }}>
                    {/*画像表示 画像表示には高さ幅の指定が必要*/}
                    <Image style={styles.ownerIcon} source={{ uri: item.owner.avatar_url }}></Image>  
                    {/*ユーザの名前表示*/}
                    <Text style={styles.ownerName}> {item.owner.login } </Text>
                </View>
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

  inputWrapper: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center'
  },

  input:{
    flex:1,
    padding: 2,
    backgroundColor: '#EEE',
    borderRadius: 4
  },
  searchText:{
      padding: 10,
  },

  ownerIcon: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 5,
  },
  ownerName: {
    fontSize: 14
  },

 
});
