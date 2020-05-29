import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import './App.css';
import Header from "./uiComponents/Header";
import InsertCSVButton from "./uiComponents/insertCSVButton"
import ComboBoxAlgorithm from "./uiComponents/ComboBoxAlgorithm"
import Control from "../viewModel/control";
import TrainButton from "./uiComponents/TrainButton";
import DownloadJson from "./uiComponents/DownloadJson";
import Chart from "./uiComponents/chart";
class App extends Component{
  control=null;
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fileName: null,
            hasFile: false,
            algorithm: "",
            jsonData:null
        }
         this.control= new Control();
    }
    changeAlgorithm =(event)=> {
        this.setState({algorithm: event.target.value});
    }
    resetAlgorithm =(algorithm)=> {
        this.setState({algorithm:algorithm});
    }
    setDataFromFile =(data, fileInfo)=> {
        this.setState({data:data, fileName: fileInfo.name, hasFile:true,algorithm:'',jsonData:null});
    };
    handleTraining =()=> {
        this.control.setData(this.state.algorithm,this.state.data,this.state.hasFile)
        let success=this.control.performTraining();
        if(success===false){
            this.resetAlgorithm("");
            this.setState({jsonData:null});
        }
        else {
            this.setState({jsonData:this.control.getJsonContent()});
        }
    }

    downloadJsonData =()=> {
        if(this.state.jsonData!==null)
        return <DownloadJson jsonData={this.state.jsonData} algorithm={this.state.algorithm}/>
    }
    render(){
    return(
        <div className="mt-4 mb-4 text-center" >
            <Header/>
            <InsertCSVButton handleForce={this.setDataFromFile}/>
            <p>{this.state.fileName}</p>
            <ComboBoxAlgorithm changeAlgorithm={this.changeAlgorithm} algorithm={this.state.algorithm}/>
            <p/>
            <TrainButton train={this.handleTraining}/>
            <p/>
            {this.downloadJsonData()}
            <Chart data={this.state.data} hasFile={this.state.hasFile}  json={this.state.jsonData}/>
        </div>
    );
  }
}
export default App;
