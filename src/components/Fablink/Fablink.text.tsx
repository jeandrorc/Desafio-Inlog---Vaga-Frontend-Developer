import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FabLink from "./Fablink";

describe("FabLink", () => {
  it("renders a link with the correct href", () => {
    const link = "/example";
    render(
      <MemoryRouter>
        <FabLink link={link} title="Example" />
      </MemoryRouter>
    );
    const linkElement = screen.getByRole("link");
    expect(linkElement.getAttribute("href")).toEqual(link);
  });

  it("renders the title correctly", () => {
    const title = "Example";
    render(
      <MemoryRouter>
        <FabLink link="/example" title={title} />
      </MemoryRouter>
    );
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the icon if provided", () => {
    const icon = <i className="material-icons">add</i>;
    render(
      <MemoryRouter>
        <FabLink link="/example" title="Example" icon={icon} />
      </MemoryRouter>
    );
    const iconElement = screen.getByText("add");
    expect(iconElement).toBeInTheDocument();
  });
});
