# react-native-slide-alert
A slide from top alert view

## Usage

```js
// MyComponent.js
import { AlertBar } from 'react-native-slide-alert'

export default () =>
  <View>
    <AlertBar />
  </View>

// AnotherComponent.js
import Alert from 'react-native-slide-alert'

export default class extends React.Component {

  onError = () => {
    Alert.showAlert({
      message: 'Alarm! Alarm!',
      alertType: 'error'
    })
  }

  render () {
    return <View />
  }
}
```
