import {Svm, SvmData} from "../svm";

it('should be ok', function () {
    const data: SvmData = {
        bias: 1.363618234217184,
        wheits: [
            -0.032274505797868946,
            -0.021486578304954727,
            -0.0542787381049902
        ]
    }
    const SVM = new Svm(data)
    const input = [-0.4326, 11.909, 3]
    expect(SVM.predict(input)).toStrictEqual(1)
});
it('should be ok', function () {
    const data: SvmData = {
        bias: 1.363618234217184,
        wheits: [
            -0.032274505797868946,
            -0.021486578304954727,
            -0.0542787381049902
        ]
    }
    const SVM = new Svm(data)
    const input = [-11.465, 0.1746, 6]
    expect(SVM.predict(input)).not.toBe(-1)
});

it('should throw error - less', function () {
    const data: SvmData = {
        bias: 1.363618234217184,
        wheits: [
            -0.032274505797868946,
            -0.021486578304954727,
            -0.0542787381049902
        ]
    }
    const SVM = new Svm(data)
    const input: number[] = []
    expect(() => SVM.predict(input)).toThrowError(Error("The number of inputs is less than expected"))
});

it('should throw error - greater', function () {
    const data: SvmData = {
        bias: 1.363618234217184,
        wheits: [
            -0.032274505797868946,
            -0.021486578304954727,
            -0.0542787381049902
        ]
    }
    const SVM = new Svm(data)
    const input = [1, 1, 1, 1]
    expect(() => SVM.predict(input)).toThrowError(Error("The number of inputs is greater than expected"))
});