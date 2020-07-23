import React from "react";
import { render } from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import GlasswallLogo from "../GlasswallLogo";

const svgUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 254.33 147' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff'%3E%3Cpath d='M163.81 93.12l-15.86 49.22h2.92l15.87-49.22zM179.01 55.02l15.71-48.74h-2.92l-15.71 48.74zM4.13 74.11v-.08C4.13 66.32 10.14 60 18.36 60c4.89 0 7.83 1.32 10.66 3.72l-3.76 4.54c-2.09-1.74-3.96-2.75-7.1-2.75-4.34 0-7.79 3.84-7.79 8.45v.08c0 4.96 3.41 8.61 8.22 8.61 2.17 0 4.11-.54 5.62-1.63v-3.88H18.2v-5.16h11.79v11.79c-2.79 2.37-6.63 4.3-11.59 4.3-8.45 0-14.27-5.93-14.27-13.96zM34.52 60.46h5.97v21.71h13.53v5.43h-19.5zM69.06 60.27h5.5L86.19 87.6h-6.24l-2.48-6.09H65.99l-2.48 6.09h-6.09zm6.28 15.97l-3.6-8.8-3.61 8.8zM88.14 83.65l3.53-4.23c2.44 2.02 5 3.3 8.1 3.3 2.44 0 3.92-.97 3.92-2.56v-.08c0-1.51-.93-2.29-5.47-3.45-5.47-1.4-9-2.91-9-8.3v-.08c0-4.92 3.95-8.18 9.5-8.18 3.95 0 7.33 1.24 10.08 3.45l-3.1 4.5c-2.4-1.67-4.77-2.68-7.06-2.68s-3.49 1.05-3.49 2.36v.08c0 1.79 1.16 2.37 5.85 3.57 5.51 1.43 8.61 3.41 8.61 8.14v.08c0 5.39-4.11 8.41-9.97 8.41-4.09.01-8.24-1.42-11.5-4.33zM112.29 83.65l3.53-4.23c2.44 2.02 5 3.3 8.1 3.3 2.44 0 3.92-.97 3.92-2.56v-.08c0-1.51-.93-2.29-5.47-3.45-5.47-1.4-9-2.91-9-8.3v-.08c0-4.92 3.95-8.18 9.5-8.18 3.95 0 7.33 1.24 10.08 3.45l-3.1 4.5c-2.4-1.67-4.77-2.68-7.06-2.68s-3.49 1.05-3.49 2.36v.08c0 1.79 1.16 2.37 5.85 3.57 5.51 1.43 8.61 3.41 8.61 8.14v.08c0 5.39-4.11 8.41-9.97 8.41-4.09.01-8.24-1.42-11.5-4.33zM156.56 60.38h2.52l7.44 22.68 7.76-22.6h3.22l-9.69 27.34h-2.6l-7.44-22.03-7.48 22.03h-2.56l-9.69-27.34h3.33l7.76 22.6zM202.29 87.6H199l-3.18-7.17h-14.77l-3.22 7.17h-3.14l12.37-27.33h2.87zm-13.84-23.76l-6.21 13.84h12.37zM207.09 60.46h3.06v24.31h15.28v2.83h-18.34zM230.24 60.46h3.06v24.31h15.28v2.83h-18.34z'/%3E%3C/g%3E%3C/svg%3E";

test("GlasswallLogo_Snapshot", () => {
    // Arrange
    const component = TestRenderer.create(<GlasswallLogo />);

    // Act
    let tree = component.toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
});

// Unit Tests
test("Renders_Logo_Div", () => {
    // Arrange
    const { getByTestId } = render(<GlasswallLogo />);

    // Act
    const logoElement = getByTestId("logoDiv");

    // Assert
    expect(logoElement).toBeInTheDocument();
});

test("Renders_Correct_Logo", () => {
    // Arrange
    const { getByTestId } = render(<GlasswallLogo />);

    //Act
    const logoElement = getByTestId("logoDiv");

    // Assert
    expect(logoElement).toHaveStyle(`background: url("${svgUrl}") no-repeat center center;`);
});