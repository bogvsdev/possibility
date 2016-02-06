import {funcs} from './funcs';
import $ from 'jquery';

//launching jquery code
$(()=>{
	funcs();
});

import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";


const app = document.getElementById('container');
ReactDOM.render(<Layout/>, app);