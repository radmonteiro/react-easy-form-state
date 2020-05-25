import React, {Component} from "react";
import ReactDOM from "react-dom";


import './css/bootstrap.min.css';
import './css/css-tester.css';
import './css/styleguide.css';
// import {FormStateProvider} from '../src/container/form-state-provider.jsx';
// import {ExampleApp} from './examples/example-app';
import {SimpleExampleApp} from './examples/simple-example-app';



class FormContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };


    }

    render() {
        return (
            <>


                <SimpleExampleApp/>


            </>
        );
    }




    
}

export default FormContainer;

const wrapper = document.getElementById("app-root-element");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;

