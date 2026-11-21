import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type PortfolioIntroComponent =
  typeof import("@/components/portfolio/PortfolioIntro").PortfolioIntro;
let PortfolioIntro: PortfolioIntroComponent;

describe("Portfolio introduction", () => {
  beforeEach(async () => {
    vi.resetModules();
    window.sessionStorage.clear();
    vi.useFakeTimers();
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    ({ PortfolioIntro } = await import("@/components/portfolio/PortfolioIntro"));
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("shows the intro on a fresh page load even if an old session flag exists", () => {
    window.sessionStorage.setItem("portfolio-intro-played", "1");
    const { container } = render(
      <PortfolioIntro>
        <main>Portfolio</main>
      </PortfolioIntro>,
    );

    expect(screen.getByRole("region", { name: "Portfolio introduction" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Enter Portfolio" })).toBeVisible();
    expect(container.querySelector("main")?.parentElement).toHaveAttribute("inert");
  });

  it("reveals the portfolio with an upward transition after the visitor enters", () => {
    const { container, unmount } = render(
      <PortfolioIntro>
        <main>Portfolio</main>
      </PortfolioIntro>,
    );
    const intro = screen.getByRole("region", { name: "Portfolio introduction" });

    fireEvent.click(screen.getByRole("button", { name: "Enter Portfolio" }));
    expect(intro).toHaveAttribute("data-phase", "leaving");
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(800));

    expect(container.querySelector(".portfolio-intro")).toBeNull();
    expect(screen.getByRole("main")).toBeVisible();
    unmount();

    render(
      <PortfolioIntro>
        <main>Portfolio</main>
      </PortfolioIntro>,
    );
    expect(screen.queryByRole("region", { name: "Portfolio introduction" })).toBeNull();
  });

  it("keeps the enter button available when the intro video fails", () => {
    const { container } = render(
      <PortfolioIntro>
        <main>Portfolio</main>
      </PortfolioIntro>,
    );
    const video = container.querySelector("video");
    if (!video) throw new Error("Video missing");

    fireEvent.error(video);

    expect(screen.getByRole("status")).toHaveTextContent("The introduction video is unavailable");
    expect(screen.getByRole("button", { name: "Enter Portfolio" })).toBeVisible();
  });
});
