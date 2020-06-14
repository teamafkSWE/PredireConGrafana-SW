

export default abstract class Algorithm{

    protected a:number[];
    protected b:number;

    protected constructor(a: number[], b: number){
        this.a = a
        this.b = b
    }

    abstract predict: (input: number[]) => number
}