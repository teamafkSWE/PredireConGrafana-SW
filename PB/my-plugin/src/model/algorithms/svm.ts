import Algorithm from "../algorithm";


export interface SvmData {
    wheits: number[]
    bias: number
}

export class Svm implements Algorithm{

    private readonly _wheits:number[];
    private readonly _bias:number;

    constructor(parameters: SvmData) {
        this._wheits = parameters.wheits
        this._bias = parameters.bias
    }

    predict(input: number[]): 1|-1 {
        if (input.length < this._wheits.length)
            throw new Error("The number of inputs is less than expected")
        else if (input.length > this._wheits.length)
            throw new Error("The number of inputs is greater than expected")
        else if (input.length === this._wheits.length){
            let sum = 0
            for (let i = 0; i < input.length; i++)
                sum += input[i]*this._wheits[i]
            const prediction = sum + this._bias
            if (prediction>=0)
                return 1
            else return -1
        }
        else
            throw new Error("You should not see this error...")
    }

}