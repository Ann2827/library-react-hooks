import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { logsEnable } from 'library-react-hooks';

logsEnable();

ReactDOM.render(<App />, document.getElementById('root'));
