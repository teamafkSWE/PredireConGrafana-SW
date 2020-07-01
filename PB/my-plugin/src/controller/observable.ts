import Observer from "../view/components/observer/observer";

abstract class Observable {
    private _observers: Observer[] = []

    public attach = (observer:Observer) =>{
        this._observers.push(observer)
    }
    public detach = (observer:Observer) => {
        this._observers = this._observers.filter((ele) => ele !== observer)
    }

    public notifyAll = () => {
        this._observers.forEach(obs => obs.update())
    }
}

export default Observable