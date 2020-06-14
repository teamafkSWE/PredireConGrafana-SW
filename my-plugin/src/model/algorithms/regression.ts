import Algorithm from "../algorithm";


export class Regression extends Algorithm{

    public constructor(a: number[], b: number) {
        super(a, b)
    }

    predict = (input: number[]): number => {
        if (input.length < this.a.length)
            throw new Error("The number of inputs is less than expected")
        else if (input.length > this.a.length)
            throw new Error("The number of inputs is greater than expected")
        else if (input.length === this.a.length){
            let sum = 0
            for (let i = 0; i < input.length; i++)
                sum += input[i]*this.a[i]
            return sum + this.b //todo: has to be a sum or a subtraction?
        }
        else
            throw new Error("You should not see this error...")
    }
}