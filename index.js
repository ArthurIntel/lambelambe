import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'

import App from './src/App'
import storeConfig from './store/storeConfig'//storeConfig deveria está no ./src/store/

//Axios - URL
import axios from 'axios'
axios.defaults.baseURL = 'https://lambelambe-7d726.firebaseio.com/'

//Ignorar os warnings
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated'
]);

//Store do redux
const store = storeConfig()
const Redux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent('lambelambe', () => Redux)
