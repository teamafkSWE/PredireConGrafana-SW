import React, {Component} from 'react';
import Files from 'react-files'


interface insJson {
    setData:(arg0:any,arg1:any,arg2:any)=>void
}
class InsJson extends Component<insJson> {
    private fileReader: any;


    onChange=(file:any[])=>{
        this.fileReader = new FileReader();
        this.fileReader.readAsText(file[file.length-1]);
        this.fileReader.onload = (event: { target: { result: string; }; }) => {
            const data= JSON.parse(event.target.result);
            if(data.w)
            {
                this.props.setData("svm",data.w,data.b);

            }
            else {
                this.props.setData("rl",data.a,data.b);

            }
        };
       }
    render() {

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
