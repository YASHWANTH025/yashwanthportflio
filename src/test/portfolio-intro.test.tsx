import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PortfolioIntro } from "@/components/portfolio/PortfolioIntro";

describe("Portfolio introduction", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.useFakeTimers();
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  });
  afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });

  it("reveals the portfolio when the uploaded film finishes", () => {
    const { container } = render(<PortfolioIntro><main>Portfolio</main></PortfolioIntro>);
    const video = container.querySelector("video");
    if (!video) throw new Error("Video missing");
    fireEvent.ended(video);
    act(() => vi.advanceTimersByTime(700));
    expect(screen.queryByRole("region", { name: "Portfolio introduction" })).toBeNull();
    expect(screen.getByRole("main")).toBeVisible();
  });

  it("lets visitors skip without waiting for playback", () => {
    render(<PortfolioIntro><main>Portfolio</main></PortfolioIntro>);
    fireEvent.click(screen.getByRole("button", { name: "Skip Intro" }));
    act(() => vi.advanceTimersByTime(700));
    expect(screen.queryByRole("region", { name: "Portfolio introduction" })).toBeNull();
  });

  it("cannot trap a visitor when autoplay stalls", () => {
    render(<PortfolioIntro><main>Portfolio</main></PortfolioIntro>);
    act(() => vi.advanceTimersByTime(30000));
    act(() => vi.advanceTimersByTime(700));
    expect(screen.queryByRole("region", { name: "Portfolio introduction" })).toBeNull();
  });

  it("plays once per session and skips immediately on later visits", () => {
    window.sessionStorage.setItem("portfolio-intro-played", "1");
    render(<PortfolioIntro><main>Portfolio</main></PortfolioIntro>);
    expect(screen.queryByRole("region", { name: "Portfolio introduction" })).toBeNull();
    expect(screen.getByRole("main")).toBeVisible();
  });
});
