import {Regression, RLData} from "../regression";

it('RL test ok', function(){
    const data: RLData = {
        b: -4.103581234222119,
        a: [
            0.08640900619401126,
            0.08760164313749375
        ]
    }
    const RL= new Regression(data)
    const input = [40, 25]
    // TO DO: check expected
    expect(RL.predict(input)).toStrictEqual(1.542820091975675)
});

it('RL test not ok', function(){
    const data: RLData = {
        b: -4.103581234222119,
        a: [
            0.08640900619401126,
            0.08760164313749375
        ]
    }
    const RL= new Regression(data)
    const input = [40, 25]
    expect(RL.predict(input)).not.toBe(1)
});

it('RL test input exceed', function(){
    const data: RLData = {
        b: -4.103581234222119,
        a: [
            0.08640900619401126,
            0.08760164313749375
        ]
    }
    const RL= new Regression(data)
    const input = [40, 25, 1]
    expect(() =>  RL.predict(input)).toThrowError(Error("The number of inputs is greater than expected"))
});