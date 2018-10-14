import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation'; //画面遷移のためのライブラリ
import Home from './Home';
import Detail from './Detail'


export default createStackNavigator({
  Home: {
    screen: Home,  //画面遷移場所の指定
    navigationOptions: {
      title: 'Home',//画面のタイトル設定
    },
  },
  Detail : {
    screen : Detail,
    navigationOptions: ({navigation}) => ({ //動的にタイトル名を変えるため{navigation}を追加する
      title: navigation.state.params.item.name,
    })

  }
},{
  initialRouteName: 'Home', //画面の初期画面設定

}

);