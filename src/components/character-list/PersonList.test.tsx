// PersonList.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { PersonList } from "./PersonList";
import { usePeople } from "../../hooks/usePeople";
import { fetchData } from "../../api/starWarsApi";
import * as React from "react";
import { PersonList } from "./CharacterList";

// Mock the usePeople hook
jest.mock("../../hooks/usePeople");
jest.mock("../../api/starWarsApi");

const mockUsePeople = usePeople as jest.Mock;
const mockFetchData = fetchData as jest.Mock;

describe("PersonList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading spinner when data is loading", () => {
    mockUsePeople.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<PersonList />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument(); // Assuming LoadingSpinner displays "Loading..."
  });

  it("renders error message when there is an error", () => {
    mockUsePeople.mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: "Something went wrong" },
    });

    render(<PersonList />);

    expect(
      screen.getByText(/An error occurred: Something went wrong/i)
    ).toBeInTheDocument();
  });

  it("renders the list of people", async () => {
    mockUsePeople.mockReturnValue({
      data: {
        results: [
          { id: 1, name: "Luke Skywalker", films: [], starships: [] },
          { id: 2, name: "Darth Vader", films: [], starships: [] },
        ],
        next: null,
      },
      isLoading: false,
      error: null,
    });

    render(<PersonList />);

    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
    });
  });

  it("fetches character data when a person is clicked", async () => {
    mockUsePeople.mockReturnValue({
      data: {
        results: [{ id: 1, name: "Luke Skywalker", films: [], starships: [] }],
        next: null,
      },
      isLoading: false,
      error: null,
    });
    mockFetchData.mockResolvedValueOnce([{ title: "A New Hope" }]); // Mock for films

    render(<PersonList />);

    const person = screen.getByText(/Luke Skywalker/i);
    fireEvent.click(person);

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledWith([], "films"); // Ensure the API was called correctly
    });
  });

  it("handles pagination correctly", async () => {
    mockUsePeople.mockReturnValue({
      data: {
        results: [
          { id: 1, name: "Luke Skywalker", films: [], starships: [] },
          { id: 2, name: "Darth Vader", films: [], starships: [] },
        ],
        next: "nextPageUrl",
      },
      isLoading: false,
      error: null,
    });

    render(<PersonList />);

    expect(screen.getByText(/1/i)).toBeInTheDocument();

    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    expect(mockUsePeople).toHaveBeenCalledWith(2); // Check if the next page was fetched
  });

  it("disables the Previous button on the first page", () => {
    mockUsePeople.mockReturnValue({
      data: {
        results: [],
        next: "nextPageUrl",
      },
      isLoading: false,
      error: null,
    });

    render(<PersonList />);

    const prevButton = screen.getByText(/Previous/i);
    expect(prevButton).toBeDisabled();
  });
});
