export default {
  component: null,
  alerts: [],

  registerComponent (ref) {
    this.component = ref
    this.component.onDismiss = (i) => this.hideAlert(i)
  },

  unregisterComponent () {
    if (this.component) {
      this.component.onDismiss = null
    }
    this.component = null
  },

  showAlert (state = {}) {
    if (!this.component) return
    this.alerts.push(state)
    this.component.updateState(this.alerts)
  },

  hideAlert (index = false) {
    if (!this.component) return
    if (index) {
      this.alerts.splice(index, 1)
    } else {
      this.alerts.shift()
    }
    this.component.updateState(this.alerts)
  }
}

import React, { Component } from 'react'
import { Animated, View, TouchableOpacity, Text } from 'react-native'

export class AlertBar extends Component {
  state = {
    alerts: []
  }

  animatedValue = new Animated.Value(-70)

  updateState (alerts) {
    if (alerts.length > this.state.alerts.length) {
      this.animatedValue.setValue(-70)
      Animated.timing(this.animatedValue, {toValue: 0, duration: 350}).start()
    }

    // clone Array to make it immutable
    this.setState({alerts: [...alerts]})
  }

  render () {
    const {alerts} = this.state

    return <Animated.View style={{
      transform: [{translateY: this.animatedValue}],
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      justifyContent: 'center'
    }}>
      {alerts.map((alert, i) =>
        <TouchableOpacity key={i} style={styles[alert.alertType]} onPress={() => this.onDismiss(i)}>
          <View style={styles.alertView}>
            {!!alert.title &&
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{alert.title}</Text>
            }
            <Text style={{color: 'white', fontSize: 16}}>{alert.message}</Text>
          </View>
        </TouchableOpacity>
      )}
    </Animated.View>
  }
}

const styles = {
  alertView: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 10
  },

  info: {
    flex: 1,
    backgroundColor: '#007bff'
  },

  success: {
    flex: 1,
    backgroundColor: 'darkgreen'
  },

  error: {
    flex: 1,
    backgroundColor: '#ff3232'
  },

  warning: {
    flex: 1,
    backgroundColor: '#ff9c00'
  }
}
