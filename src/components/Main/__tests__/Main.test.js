import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import Main from "../Main";

const paragraph = <p key="paragraph">Test paragraph.</p>;

const button = <button key="button">Test Button</button>;

const props = {
    expanded: true,
    showTitle: true,
    title: "Test Title",
    children: [
        paragraph,
        button
    ]
};

test("Main_Snapshot", () => {
    // Arrange
    const component = TestRenderer.create(<Main {...props} />);

    // Act
    let tree = component.toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
});

test("Displays_Correct_Props", () => {
    // Arrange
    // Act
    const mainComponent = mount(<Main {...props} />);

    // Assert
    expect(mainComponent.prop("expanded")).toEqual(props.expanded);
    expect(mainComponent.prop("showTitle")).toEqual(props.showTitle);
    expect(mainComponent.prop("title")).toEqual(props.title);
    expect(mainComponent.prop("children")[0]).toEqual(paragraph);
    expect(mainComponent.prop("children")[1]).toEqual(button);
});