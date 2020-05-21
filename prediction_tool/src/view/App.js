import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import './App.css';
import Header from "./uiComponents/header";
import InserCSVButton from "./uiComponents/inserCSVButton"
import ComboBoxAlgorithm from "./uiComponents/ComboBoxAlgorithm"
import Select_Prediction from "../viewModel/chooseAlgorithm";

class App extends Component{
  sp=null;
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: null,
            hasFile: false,
            value: ""
        }
         this.sp= new Select_Prediction();
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
    selectAlgorithm=()=>{

    }
    render(){
        console.log(this.state.data);
        this.sp.setData(this.state.value,this.state.data,this.state.hasFile);
        this.sp.getJSON();
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
