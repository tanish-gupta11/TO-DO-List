import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Constants from 'expo-constants';
import Note from './components/Note';
import db from './config';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    };
  }

  componentDidMount() {
    const tasks = db.ref('tasks');
    tasks.on('value', (snap) => {
      const todos = snap.val();
      const taskList = [];
      for (let id in todos) {
        taskList.push({ id, ...todos[id] });
      }
      this.setState({ noteArray: taskList });
    });
  }

  addTask = () => {
    if (this.state.noteText) {
      const tasks = db.ref('tasks'); //
      var d = new Date();
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const newTask = {
        note: this.state.noteText,
        date:
          d.getFullYear() + ' ' + monthNames[d.getMonth()] + ' ' + d.getDate(),
      };

      this.setState({ noteArray: this.state.noteArray });
      this.setState({ noteText: '' });
      tasks.push(newTask);
    }
  };

  markDone(key) {
    const node = db.ref('tasks').child(this.state.noteArray[key].id);
    node.remove();
    this.state.noteArray.splice(key, 1);
  }
  render() {
    var notes = this.state.noteArray.map((key, val) => {
      return <Note task={key} val={val} markDone={() => this.markDone(val)} />;
    });

    return (
      <LinearGradient
          colors={['#F7FD04', '#F9B208']} 
          style={styles.container}
          >
      <Text style={styles.paragraph} >Keep It</Text>
      <Card style={styles.card}>
        <ScrollView style={styles.scrollContainer}>
          {
            notes
          }
        </ScrollView>
      </Card>
      <View style={{width: '100%', flexDirection: "row", justifyContent: "center",textAlign: "center"}}>
        <TextInput style = {styles.input} 
            underlineColorAndroid = "transparent" 
            placeholderTextColor = "#FC5404" 
            autoCapitalize = "none"
            placeholder="Enter Your Note"
            onChangeText={(noteText) => {
              this.setState({ noteText: noteText });
            }}
            value={this.state.noteText}>
          </TextInput>
          <TouchableOpacity onPress={this.addTask} style={styles.button}>
            <Text style={{marginTop: -10,color: 'white', fontSize: 40, marginLeft: 9}}>+</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  card: {
    borderRadius: 40 ,
    width: '95%',
    flex: 1,
    margin: 8,
    paddingTop: 30,
    paddingBottom: 30
  },
  button: {
    backgroundColor: '#FC5404',
    height: 40, 
    width: 40, 
    borderRadius: 20, 
    marginLeft: 8
  },
  paragraph: {
    margin: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FC5404',
    fontSize: 24
  },
  input: {
    marginTop: 0,
    marginBottom: 20,
    height: 40,
    width: '80%',
    borderColor: '#FC5404',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: "center"
   },
});

