import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"

import Layout from "./components/Layout";
import store from "./store";
import * as funcs from "./funcs";


const app = document.getElementById('container');
ReactDOM.render(<Provider store={store}><Layout/></Provider>, app);