import Algorithm from "../algorithm";


export interface RLData {
    a: number[]
    b: number
}

export class Regression implements Algorithm{

    private readonly _a:number[];
    private readonly _b:number

    constructor(coefficients: RLData) {
        this._a = coefficients.a
        this._b = coefficients.b
    }

    predict(input: number[]): number {
        if (input.length < this._a.length)
            throw new Error("The number of inputs is less than expected")
        else if (input.length > this._a.length)
            throw new Error("The number of inputs is greater than expected")
        else if (input.length === this._a.length){
            let sum = 0
            for (let i = 0; i < input.length; i++)
                sum += input[i]*this._a[i]
            return sum + this._b //todo: has to be a sum or a subtraction?
        }
        else
            throw new Error("You should not see this error...")
    }
}