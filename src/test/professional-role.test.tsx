import { act, cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProfessionalRole } from "@/components/portfolio/ProfessionalRole";

function mockPreference(matches: boolean) {
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
}

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("Professional role timing", () => {
  it("holds each role for two seconds and repeats after four 2500ms cycles", () => {
    vi.useFakeTimers();
    mockPreference(false);
    const { container } = render(<ProfessionalRole />);
    const index = () => container.querySelector("[data-role-index]")?.getAttribute("data-role-index");
    expect(index()).toBe("0");
    act(() => vi.advanceTimersByTime(2000));
    expect(index()).toBe("0");
    act(() => vi.advanceTimersByTime(500));
    expect(index()).toBe("1");
    act(() => vi.advanceTimersByTime(2500));
    expect(index()).toBe("2");
    act(() => vi.advanceTimersByTime(2500));
    expect(index()).toBe("3");
    act(() => vi.advanceTimersByTime(2500));
    expect(index()).toBe("0");
  });

  it("does not cycle when reduced motion is requested", () => {
    vi.useFakeTimers();
    mockPreference(true);
    const { container } = render(<ProfessionalRole />);
    act(() => vi.advanceTimersByTime(10000));
    expect(container.querySelector("[data-role-index]")?.getAttribute("data-role-index")).toBe("0");
  });
});