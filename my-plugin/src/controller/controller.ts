

export default class Controller {
    private _json: any

    public setJson(json: any){
        this._json = json;
        return this
    }

    get json(){
        return this._json
    }

    sayHello(){
        console.log("hello")
    }
}