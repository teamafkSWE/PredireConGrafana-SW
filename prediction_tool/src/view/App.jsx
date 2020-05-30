import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import './app.css';
import Header from "./uiComponents/header";
import InsertCsvButton from "./uiComponents/insert_csv_button"
import ComboBoxAlgorithm from "./uiComponents/combo_box_algorithm"
import Control from "../viewModel/control";
import TrainButton from "./uiComponents/train_button";
import DownloadJson from "./uiComponents/download_Json";
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
            <div className={"w-100 p-3 row text-center"}>
                <div className={"col 4"}>
                    <InsertCsvButton handleForce={this.setDataFromFile}/>
                    <p>{this.state.fileName}</p>
                </div>
                <div className={"col 4"}>
                    <ComboBoxAlgorithm changeAlgorithm={this.changeAlgorithm} algorithm={this.state.algorithm}/>
                </div>
                <div className={"col 4"}>
                    <TrainButton train={this.handleTraining}/>
                </div>
                <div className={"col 4"}>
                    {this.downloadJsonData()}
                </div>
            </div>
            <div id={"chart"}>
                <Chart data={this.state.data} hasFile={this.state.hasFile}  json={this.state.jsonData}/>
            </div>
        </div>
    );
  }
}
export default App;
