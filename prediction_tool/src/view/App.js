import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import './App.css';
import Header from "./uiComponents/header";
import InsertCSVButton from "./uiComponents/insertCSVButton"
import ComboBoxAlgorithm from "./uiComponents/ComboBoxAlgorithm"
import Control from "../viewModel/control";
import TrainButton from "./uiComponents/TrainButton";
import JSONButton from "./uiComponents/JSONButton";
class App extends Component{
  control=null;
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: null,
            hasFile: false,
            value: "",
            jsonData:null
        }
         this.control= new Control();
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
        this.control.setData(this.state.value,this.state.data,this.state.hasFile)
        let bol=this.control.trainAlgorithm();
        if(bol===false){
            this.errorAlg("");
        }
        else {
            console.log(this.state.data);
            this.setState({jsonData:"djskf"});

        }
    }
    downloadJsonData=()=>{
        console.log(this.state.jsonData);
        if(this.state.jsonData!==null)
        { return <JSONButton/>}

    }
    render(){
        console.log(this.state.data);
    return(
        <div className="mt-4 mb-4 text-center" >
            <Header/>
            <InsertCSVButton handleForce={this.handleForce}/>
            <p>{this.state.name}</p>
            <ComboBoxAlgorithm changeValue={this.changeValue} value={this.state.value}/>
            <p/>
            <TrainButton train={this.selectAlgorithm}/>
            {this.downloadJsonData()}
        </div>
    );
  }
}

export default App;
