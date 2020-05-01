import React, {Component} from 'react';


class InsJson extends Component {

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
        }
    render() {
        return (
            <input type='file' name='file' onChange={(e)=>this.onChange(e)}/>
        );
    }
}

export default InsJson;
