import formatDuration from "../formatDuration";
import { format } from "path";

test("Wrong_Input_Format_Throws_Error", () => {
    //Arrange
    const inputDuration = "";

    // Act
    formatDuration(inputDuration);

    // Assert
    expect(formatDuration).toThrow();
});


test("wagwan", () => {
    const inputDuration = "00:00:25.4563837";

    let result = formatDuration(inputDuration);

    console.info(result);
});
//TODO: revisit these tests