import { renderHook } from "@testing-library/react-hooks";
import useMemoryApi from "./useMemoryApi";

describe("useMemoryApi", () => {
  it("should fetch data correctly", async () => {
    const mockData = {
      events: [
        {
          images: [{ url: "image1" }, { url: "image2" }, { url: "image3" }],
          name: "Test Event",
        },
      ],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(JSON.stringify(mockData)))
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useMemoryApi("testUrl")
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({
      images: ["image1", "image2", "image3"],
      title: "Test Event",
    });
    expect(result.current.error).toBe(null);
  });

  it("should handle error correctly", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Test Error")));

    const { result, waitForNextUpdate } = renderHook(() =>
      useMemoryApi("testUrl")
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe("Test Error");
  });
});
