/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import colors from '../Colors';
import TodoModal from './TodoModal';

export default class TodoList extends React.Component {
  state = {
    showListVisible: false,
  };
  toggleListModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }
  render() {
    const listItem = this.props.listItem;
    const completedCount = listItem.todos.filter(todo => todo.completed).length;
    const remainingCount = listItem.todos.length - completedCount;
    return (
      <View>
        <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=> this.toggleListModal()}>
          <TodoModal list={listItem} closeModal={()=> this.toggleListModal()} updateList={this.props.updateList}/>
        </Modal>
        <TouchableOpacity style={[styles.listContainer, { backgroundColor: listItem.color }]} onPress={()=> this.toggleListModal()}>
          <Text style={styles.listTitle} numberOfLines={1}>
            {listItem.name}
          </Text>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subtitle}>Remaining</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>Completed</Text>
          </View>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: '200',
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});
