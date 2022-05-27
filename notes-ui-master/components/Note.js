import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default class Note extends React.Component {
  render() {
    return (
      <View key={this.props.task} style={styles.note}>
        <Text style={styles.noteTexthigh}>{this.props.task.note}</Text>
        <Text style={styles.noteText}>{this.props.task.date}</Text>
        <TouchableOpacity
          onPress={this.props.markDone}
          style={styles.noteDelete}>
          <Text style={styles.noteDeleteText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 55,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  noteTexthigh: {
    fontWeight: "bold",
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: 'orange',
    fontSize: 20
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#ededed',
  },

  noteDelete: {
    position: 'absolute',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 52,
    right: 10,
    bottom: 10,
    top: 10,
    backgroundColor: '#FC5404',
  },
  noteDeleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  }
});