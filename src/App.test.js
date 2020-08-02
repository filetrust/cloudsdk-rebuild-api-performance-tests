import React from "react";
import { render } from "@testing-library/react";
import { shallow } from "enzyme";
import App from "./App";
import SplashScreenView from "./views/SplashScreenView/SplashScreenView";

test("Renders_SplashScreen_Component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(SplashScreenView)).toHaveLength(1);
});

test("Renders_Title", () => {
    const { getByText } = render(<App />);
    const titleElement = getByText(/Rebuild API/i);
    expect(titleElement).toBeInTheDocument();
});