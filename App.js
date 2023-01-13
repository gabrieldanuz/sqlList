import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as SQLite from 'expo-sqlite'
import Constants from 'expo-constants'
import React from 'react'

const db = SQLite.openDatabase('db.db')

class Items extends React.Component {
  state = {
    items: null
  }
  componentDidMount() {
    this.update()
  }
  render() {
    const { done: doneHeading } = this.props
    const { items } = this.state
    const heading = doneHeading ? 'Concluído' : 'Para Fazer'

    if (items === null || items.length === 0) {
      return null
    }

    return (
      <View>
        <Text>{heading}</Text>
        {items.map((id, done, value) => (
          <TouchableOpacity
            key={id}
            onPress={() => this.props.onPressItem && this.props.onPressItem(id)}
            style={{
              backgroundColor: done ? '#LC9963' : '#FFF',
              borderColor: '#000',
              padding: 8
            }}
          >
            <Text stule={{ color: done ? '#FFF' : '#000' }}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  update() {
    db.transaction(tx => {
      tx.executeSql(
        'select * from items where done = ? ',
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      )
    })
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
