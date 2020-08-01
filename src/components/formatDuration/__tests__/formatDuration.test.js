import formatDuration from "../formatDuration";

test("Wrong_Input_Format_Throws_Error", () => {
    //Arrange
    const inputDuration = "";

    // Act
    formatDuration(inputDuration);

    // Assert
    expect(formatDuration).toThrow();
});

test("Input_With_Milliseconds", () => {
    // Arrange
    const inputDuration = "00:00:00.25";
    const expectedOutput = "0.2500000";

    // Act
    let result = formatDuration(inputDuration);

    // Assert
    expect(result).toEqual(expectedOutput);
});

test("Input_With_Seconds", () => {
    // Arrangea
    const inputDuration = "00:00:25.0";
    const expectedOutput = "25.0000000";

    // Act
    let result = formatDuration(inputDuration);

    // Assert
    expect(result).toEqual(expectedOutput);
});

test("Input_With_Minutes", () => {
    // Arrange
    const inputDuration = "00:25:00.0";
    const expectedOutput = "1500.0000000";

    // Act
    let result = formatDuration(inputDuration);

    // Assert
    expect(result).toEqual(expectedOutput);
});

test("Input_With_Hours", () => {
    // Arrange
    const inputDuration = "25:00:00.0";
    const expectedOutput = "90000.0000000";

    // Act
    let result = formatDuration(inputDuration);

    // Assert
    expect(result).toEqual(expectedOutput);
});

test("Input_With_Seconds_And_Milliseconds", () => {
    // Arrange
    const inputDuration = "00:00:25.4563837";
    const expectedOutput = "25.4563837";

    // Act
    let result = formatDuration(inputDuration);

    // Assert
    expect(result).toEqual(expectedOutput);
});