import React, {Component} from 'react';


class JSONButton extends Component {
 /*   JSONData =  () => {
            let data = this.prop.

            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(data));
            element.setAttribute('download', 'predictorsRL.json');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        } else {
            alert("Dati non addestrati. Confermare per eseguire l'addestramento.")
        }
    }*/
    render() {
        return (
            <React.Fragment>
                <button  className="btn btn-dark">Download</button>
            </React.Fragment>
        );
    }
}

export default JSONButton;