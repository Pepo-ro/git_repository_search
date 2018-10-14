import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet
  } from 'react-native';



const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
 
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
  repoUrl: {
    marginTop: 10,
    marginBottom: 10,
  }
});










export default class Detail extends React.Component{

  render (){
    const { navigation: { state: { params: {item}}} } = this.props;  //navigation.state.params.itemが長いので短めに書く方法
    console.log(item);
    return (
      <View style={styles.container}>
      {/*画像表示*/}
      <Text style={styles.fullName}>{item.full_name}</Text>
      {/*画面と名前を横に並ばせたい*/}
      <View style={{flexDirection: 'row'  }}>
      {/*画像表示 画像表示には高さ幅の指定が必要*/}
      <Image style={styles.ownerIcon} source={{ uri: item.owner.avatar_url }}></Image>  
      {/*ユーザの名前表示*/}
      <Text style={styles.ownerName}> {item.owner.login } </Text>
      </View>
      
      {/*repositoriの説明*/}
      <Text > {item.description } </Text>
      {/*repositoriのurl*/}
      <Text style={styles.repoUrl}> {item.url} </Text>
      </View>

    );
}


}

