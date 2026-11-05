import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactForm } from "@/components/portfolio/Contact";
import { MaybeLink } from "@/components/portfolio/primitives";
import { ProjectRow } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { projects, skillCategories } from "@/data/portfolio";

describe("Skills", () => {
  it("offers every category as a pressable control", () => {
    render(<Skills />);
    for (const category of skillCategories) {
      expect(screen.getAllByRole("button", { name: category.name }).length).toBeGreaterThan(0);
    }
  });

  it("shows the selected category's technologies in the panel", async () => {
    render(<Skills />);
    const panel = document.getElementById("skills-panel")!;
    expect(within(panel).getByText("TypeScript")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "Databases" })[0]!);

    expect(await within(panel).findByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Databases" })[0]).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("reveals every technology through View All Skills", async () => {
    render(<Skills />);
    const toggle = screen.getByRole("button", { name: /view all skills/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);

    const all = document.getElementById("all-skills")!;
    expect(await within(all).findByText("Power BI")).toBeInTheDocument();
    expect(within(all).getByText("FAISS")).toBeInTheDocument();
  });
});

describe("ProjectRow", () => {
  const find = (slug: string) => projects.find((p) => p.slug === slug)!;

  it("does not offer details for a project that has none yet", () => {
    render(<ProjectRow project={find("employee-attrition-prediction")} />);
    expect(screen.getByText("Details to be added")).toBeInTheDocument();
    expect(screen.queryByText("Show details")).not.toBeInTheDocument();
  });

  it("expands a project with details, showing only what it has", () => {
    render(<ProjectRow project={find("explainable-skin-lesion-classification")} />);
    expect(screen.getByText("Show details")).toBeInTheDocument();
    expect(screen.getByText("Technical approach")).toBeInTheDocument();
    expect(screen.getByText("Evaluation methods")).toBeInTheDocument();
    expect(screen.queryByText("Verified results")).not.toBeInTheDocument();
    expect(screen.queryByText("My contribution")).not.toBeInTheDocument();
  });
});

describe("ContactForm", () => {
  const fill = () => {
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada Lovelace" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ada@example.com" } });
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "A role" } });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Hello, I would like to talk about a role." },
    });
  };

  it("shows validation errors for an empty submission", async () => {
    render(<ContactForm endpoint="" email="" />);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText("Please enter your name")).toBeInTheDocument();
  });

  it("never claims delivery when nothing is configured", async () => {
    render(<ContactForm endpoint="" email="" />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/was not sent/i)).toBeInTheDocument();
    expect(screen.queryByText(/has been sent/i)).not.toBeInTheDocument();
  });
});

describe("MaybeLink", () => {
  it("renders a disabled link when there is no destination", () => {
    render(<MaybeLink href="">GitHub</MaybeLink>);
    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).not.toHaveAttribute("href");
  });

  it("opens external links safely", () => {
    render(<MaybeLink href="https://github.com/example">GitHub</MaybeLink>);
    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
