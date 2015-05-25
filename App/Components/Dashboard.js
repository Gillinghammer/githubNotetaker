var React = require('react-native');
var api = require('../Utils/api');
var Profile = require('./Profile');
var Notes = require('./Notes');
var Repositories = require('./Repositories');
var {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} = React;

class Dashboard extends React.Component{
  makebackground(btn){
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }
    if(btn === 0){
      obj.backgroundColor = '#48BBEC'
    } else if(btn === 1){
      obj.backgroundColor = '#E77AAE'
    } else if(btn === 2){
      obj.backgroundColor = '#758BF4'
    }
    return obj;
  }
  goToProfile(){
    this.props.navigator.push({
      title: this.props.userInfo.login ,
      component: Profile,
      passProps: {userInfo: this.props.userInfo}
    });
  }
  goToRepos(){
    api.getRepos(this.props.userInfo.login)
      .then((res)=>{
        console.log(res)
        this.props.navigator.push({
          component: Repositories,
          title: 'Repos',
          passProps: {
            userInfo: this.props.userInfo,
            repos: res
          }
        });
      });
  }
  goToNotes(){
    api.getNotes(this.props.userInfo.login)
      .then((res)=> {
        res = res || {};
        this.props.navigator.push({
          component: Notes,
          title: 'Notes',
          passProps: {
            userInfo: this.props.userInfo,
            notes: res
          }
        });
      })
  }
  render(){
    return (
      <View style = {styles.container}>
      <Image style={styles.image} source={{uri: this.props.userInfo.avatar_url}} />
      <TouchableHighlight
        style={this.makebackground(0)}
        onPress={this.goToProfile.bind(this)}
        underlayColor="#88D4F5">
          <Text style={styles.buttonText}> View Profile </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={this.makebackground(1)}
        onPress={this.goToRepos.bind(this)}
        underlayColor="#88D4F5">
          <Text style={styles.buttonText}> View Repos </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={this.makebackground(2)}
        onPress={this.goToNotes.bind(this)}
        underlayColor="#88D4F5">
          <Text style={styles.buttonText}> View Notes </Text>
      </TouchableHighlight>
      </View>
    )
  }
};


var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

module.exports = Dashboard;