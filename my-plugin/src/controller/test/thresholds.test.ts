import Controller from "../controller";

const controller = Controller.requireController(1);

test('max threshold must be 10 and min threshold must be 3', () => {
    window.alert = jest.fn();
    expect(controller.setThresholds(3, 10)).toBe(true);
    expect(window.alert).toBeCalledWith("Soglie inserite correttamente.");
});

test('Error: max and min thresholds must be different', () => {
    //expect(controller.setThresholds(3, 3)).toBe(false);
    window.alert = jest.fn();
    expect(controller.setThresholds(30, 10)).toBe(false);
    expect(window.alert).toBeCalledWith('SogliaMin non valida. Inserire un valore minore della sogliaMax.');
});

test('Error: max and min thresholds must be different', () => {
    //expect(controller.setThresholds(3, 3)).toBe(false);
    window.alert = jest.fn();
    expect(controller.setThresholds(0, 0)).toBe(false);
    expect(window.alert).toBeCalledWith('SogliaMin non valida. Inserire un valore minore della sogliaMax.');
});


