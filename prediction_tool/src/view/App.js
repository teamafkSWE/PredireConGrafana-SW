import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import './App.css';
import Header from "./uiComponents/header";
import InserCSVButton from "./uiComponents/inserCSVButton"
import ComboBoxAlgorithm from "./uiComponents/ComboBoxAlgorithm"


class App extends Component{
    state = {
        data: [],
        name: null,
        hasFile: false,
        value: ""
    }
    changeValue=(event)=>{
        this.setState({value: event.target.value});
    }
    errorAlg=(value)=>{
        this.setState({value:value});
    }
    handleForce = (data, fileInfo) => {

        this.setState({data:data, name: fileInfo.name, hasFile:true,value:''});
    };

    render(){
        console.log(this.state.data);
    return(
        <div className="mt-4 mb-4 text-center" >
            <Header/>
            <InserCSVButton handleForce={this.handleForce}/>
            <p>{this.state.name}</p>
            <ComboBoxAlgorithm changeValue={this.changeValue} value={this.state.value}/>
        </div>
    );
  }
}

export default App;
