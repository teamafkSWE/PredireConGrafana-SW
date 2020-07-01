import Controller from "../controller";


test('getPredictions null', () => {
    const controller = Controller.requireController(1);

    expect(controller.getPrediction([1,2,3])).toBeNull();
});

test('getDatasource null', () => {
    const controller = Controller.requireController(1);
    expect(controller.getDatasource()).toBeNull();
});

