// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>
    ,
    document.getElementById('root')
);
