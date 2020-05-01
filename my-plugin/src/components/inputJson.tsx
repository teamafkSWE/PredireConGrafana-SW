import React, {Component} from 'react';
import Files from 'react-files'



class InsJson extends Component {
    private fileReader: any;
    state = {
        jsonFile: {}
    }

    constructor(props: Readonly<{}>) {
        super(props);
        this.fileReader = new FileReader();
        this.fileReader.onload = (event: { target: { result: string; }; }) => {
            this.setState({ jsonFile: JSON.parse(event.target.result) }, () => {
                console.log(this.state.jsonFile);
            });
        };
    }
    /*
    onChange=(e:any)=>{
        let file=e.target.files[0];
        console.log(file);
       /* file.map(function (item:any,index:any) {
            console.log(item.b);
        });*/

     /*   file.map((data:any)=>{
            return  console.log(data.b);

        })*/
       // console.log(JSON.parse(file));
     //   }
    render() {
        return (
            <Files
                className="files-dropzone"
                onChange={(file: any[]) => {
                    this.fileReader.readAsText(file[0]);
                }}
                onError={(err: any) => console.log(err)}
                accepts={[".json"]}
                multiple
                maxFiles={3}
                maxFileSize={10000000}
                minFileSize={0}
                clickable
            >
                Drop files here or click to upload
            </Files>
        );
    }
}

export default InsJson;
