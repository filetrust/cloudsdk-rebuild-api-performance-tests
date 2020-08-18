import React from "react";
import { render } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import SplashScreen from "../SplashScreen";
import GlasswallLogo from "../../GlasswallLogo/GlasswallLogo";

const paragraph = <p key="paragraph">Test paragraph.</p>;

const button = <button key="button">Test Button</button>;

const props = {
    heading: "Test Heading",
    subHeading: "Test Sub Heading",
    children: [
        paragraph,
        button
    ]
};

test("SplashScreen_Snapshot", () => {
    // Arrange
    const component = TestRenderer.create(<SplashScreen {...props}/>);

    // Act
    let tree = component.toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
});

test("Renders_GlasswallLogo_Component", () => {
    // Arrange
    // Act
    const wrapper = shallow(<SplashScreen {...props}/>);

    // Assert
    expect(wrapper.find(GlasswallLogo)).toHaveLength(1);
});

/* Unit Tests */
test("Renders_SplashContainer_Div", () => {
    // Arrange
    const { getByTestId } = render(<SplashScreen {...props}/>);

    // Act
    const logoElement = getByTestId("splashContainerDiv");

    // Assert
    expect(logoElement).toBeInTheDocument();
});

test("Renders_LogoContainer_Div", () => {
    // Arrange
    const { getByTestId } = render(<SplashScreen {...props}/>);

    // Act
    const logoElement = getByTestId("logoContainerDiv");

    // Assert
    expect(logoElement).toBeInTheDocument();
});

test("Renders_HeadingContainer_Div", () => {
    // Arrange
    const { getByTestId } = render(<SplashScreen {...props}/>);

    // Act
    const logoElement = getByTestId("headingContainerDiv");

    // Assert
    expect(logoElement).toBeInTheDocument();
});

test("Renders_ChildContainer_Div", () => {
    // Arrange
    const { getByTestId } = render(<SplashScreen {...props}/>);

    // Act
    const logoElement = getByTestId("childContainerDiv");

    // Assert
    expect(logoElement).toBeInTheDocument();
});

test("Displays_Correct_Props", () => {
    // Arrange
    // Act
    const splashScreenComponent = mount(<SplashScreen {...props}/>);

    // Assert
    expect(splashScreenComponent.prop("heading")).toEqual(props.heading);
    expect(splashScreenComponent.prop("subHeading")).toEqual(props.subHeading);
    expect(splashScreenComponent.prop("children")[0]).toEqual(paragraph);
    expect(splashScreenComponent.prop("children")[1]).toEqual(button);
});