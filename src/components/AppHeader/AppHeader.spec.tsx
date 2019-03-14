import React from "react";
import AppHeader from "./AppHeader";
import renderer from "react-test-renderer";

const mockProps = (props: Object) => ({
  title: "Test",
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    toggleDrawer: jest.fn()
  },
  ...props
});

describe.only("Header", () => {
  it("should render as expected", () => {
    const header = renderer.create(<AppHeader title="Test" />).toJSON;
    expect(header).toMatchSnapshot();
  });

  it("should render back icon when navigation prop is provided", () => {
    const props = mockProps({ backScreen: "TestScreen" });
    const header = renderer.create(<AppHeader {...props} />);
    const backIcon = header.root.findAll(
      el => el.type === "Text" && el.props.testID === "close"
    );
    expect(backIcon).toHaveLength(1);
  });

  it("should NOT render user icon when backScreen prop is provided", () => {
    const props = mockProps({ backScreen: "TestScreen" });
    const header = renderer.create(<AppHeader {...props} />);
    const userIcon = header.root.findAll(
      el => el.type === "Text" && el.props.testID === "contact"
    );
    expect(userIcon).toHaveLength(0);
  });

  it("should call navigation.navigate when pressed and some backScreen is provided", () => {
    const props = mockProps({ backScreen: "TestScreen" });
    const header = renderer.create(<AppHeader {...props} />);
    const backIcon = header.root.find(
      el => el.type === "Text" && el.props.testID === "close"
    );
    backIcon.props.onPress();
    expect(props.navigation.navigate).toHaveBeenCalledWith(
      (props as any).backScreen
    );
  });

  it("should call navigation.toggleDrawer when menu icon is pressed", () => {
    const props = mockProps({});
    const header = renderer.create(<AppHeader {...props} />);
    const backIcon = header.root.find(
      el => el.type === "Text" && el.props.testID === "menu"
    );
    backIcon.props.onPress();
    expect(props.navigation.toggleDrawer).toBeCalled();
  });
});
