import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import './App.css';
import Header from "./uiComponents/header";
import InsertCSVButton from "./uiComponents/insertCSVButton"
import ComboBoxAlgorithm from "./uiComponents/ComboBoxAlgorithm"
import Control from "../viewModel/control";
import TrainButton from "./uiComponents/TrainButton";
import JSONButton from "./uiComponents/JSONButton";
import Chart from "./uiComponents/chart";
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

        this.setState({data:data, name: fileInfo.name, hasFile:true,value:'',jsonData:null});
    };
    selectAlgorithm=()=>{
        this.control.setData(this.state.value,this.state.data,this.state.hasFile)
        let bol=this.control.trainAlgorithm();
        if(bol===false){
            this.errorAlg("");
            this.setState({jsonData:null});
        }
        else {
            this.setState({jsonData:this.control.getJSON()});

        }
    }
    JSONData =  () => {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(this.state.jsonData));
        element.setAttribute('download', 'predictorsRL.json');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    downloadJsonData=()=>{
        if(this.state.jsonData!==null)
        { return <JSONButton json={this.JSONData}/>}
    }
    render(){
    return(
        <div className="mt-4 mb-4 text-center" >
            <Header/>
            <InsertCSVButton handleForce={this.handleForce}/>
            <p>{this.state.name}</p>
            <ComboBoxAlgorithm changeValue={this.changeValue} value={this.state.value}/>
            <p/>
            <TrainButton train={this.selectAlgorithm}/>
            <p/>
            {this.downloadJsonData()}
            <Chart data={this.state.data} hasFile={this.state.hasFile} json={this.state.jsonData}/>
        </div>
    );
  }
}

export default App;
