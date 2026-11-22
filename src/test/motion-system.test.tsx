import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("lenis", () => ({
  default: class {
    start = vi.fn();
    stop = vi.fn();
    destroy = vi.fn();
  },
}));

import { MotionSystem } from "@/components/portfolio/MotionSystem";

describe("MotionSystem", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("updates and clamps the page scroll progress indicator", () => {
    let scrollY = 500;
    vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(2000);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(1000);
    vi.spyOn(window, "scrollY", "get").mockImplementation(() => scrollY);
    const frames: FrameRequestCallback[] = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      frames.push(callback);
      return frames.length;
    });

    const { container } = render(
      <MotionSystem>
        <main>Portfolio</main>
      </MotionSystem>,
    );
    const indicator = container.querySelector(".scroll-progress");

    act(() => frames.shift()?.(0));
    expect(indicator).toHaveStyle({ "--scroll-progress": "0.5" });

    scrollY = 1500;
    act(() => fireEvent.scroll(window));
    act(() => frames.shift()?.(0));
    expect(indicator).toHaveStyle({ "--scroll-progress": "1" });
  });
});
