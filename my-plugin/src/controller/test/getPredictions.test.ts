import Controller from "../controller";

const controller = Controller.requireController(1);

test('getPredictions null', () => {
    expect(controller.getPrediction([1,2,3])).toBeNull();
});

test('getDatasource null', () => {
    expect(controller.getDatasource()).toBeNull();
});

