import React, {Component} from 'react';
import Files from 'react-files'



class InsJson extends Component {
    private fileReader: any;
    state = {
        nameAlgorithm:"",
        firstVar: [],
        coefficienteAng:[]
    }


    onChange=(file:any[])=>{
        this.fileReader = new FileReader();
        this.fileReader.readAsText(file[file.length-1]);
        this.fileReader.onload = (event: { target: { result: string; }; }) => {
            const data= JSON.parse(event.target.result);
            if(data.w)
            {
                this.setState({nameAlgorithm:"svm",firstVar:data.w,coefficienteAng:data.b});

            }
            else {
                this.setState({nameAlgorithm:"rl",firstVar:data.a,coefficienteAng:data.b});

            }
        };
       }
    render() {
        console.log(this.state.firstVar);
        console.log(this.state.coefficienteAng);
        console.log(this.state.nameAlgorithm);
        return (
            <Files
                className="files-dropzone"
                onChange={(file: any[]) =>this.onChange(file)}
                onError={(err: any) => console.log(err)}
                accepts={[".json"]}
                multiple
                maxFiles={3}
                maxFileSize={10000000}
                minFileSize={0}
                clickable
            >
               <button  className='btn btn-secondary btn-sm'>Insert file</button>
            </Files>
        );
    }
}

export default InsJson;
