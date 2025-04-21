import { render, screen, fireEvent } from "@testing-library/react";
import { vi, expect, beforeEach, describe, it } from "vitest";
import { FeedsForm } from "./FeedsForm";
import { useFeedsForm } from "./hooks/useFeedsForm";
vi.mock("./hooks/useFeedsForm", () => ({
	useFeedsForm: vi.fn(),
}));

const mockSetUrl = vi.fn();
const mockSetErrors = vi.fn();
const mockHandleSubmit = vi.fn();

const defaultMockValues = {
	handleSubmit: mockHandleSubmit,
	isLoading: false,
	url: "",
	setUrl: mockSetUrl,
	errors: {
		invalidUrl: "",
		duplicate: "",
		parse: "",
	},
	setErrors: mockSetErrors,
};

const setup = (overrides = {}) => {
	vi.mocked(useFeedsForm).mockReturnValue({
		...defaultMockValues,
		...overrides,
		errors: {
			...defaultMockValues.errors,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			...(overrides as any).errors,
		},
	});
	return render(<FeedsForm />);
};

describe("FeedsForm", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders the form and submits with valid input", () => {
		setup({
			url: "https://example.com/rss",
		});

		const input = screen.getByPlaceholderText("Add url");
		expect(input).toBeInTheDocument();

		fireEvent.change(input, { target: { value: "https://test.com/rss" } });
		expect(mockSetUrl).toHaveBeenCalledWith("https://test.com/rss");

		const button = screen.getByRole("button", { name: "ADD!" });
		expect(button).toBeEnabled();

		fireEvent.submit(button);
		expect(mockHandleSubmit).toHaveBeenCalled();
		expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
	});

	it("disables the button when loading", () => {
		setup({ isLoading: true });

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
	});

	it("shows error when URL is invalid", () => {
		setup({
			url: "invalid-url",
			errors: {
				invalidUrl: "Please enter a proper URL",
			},
		});

		const input = screen.getByPlaceholderText("Add url");
		fireEvent.change(input, { target: { value: "invalid-url" } });

		expect(screen.getByText("Please enter a proper URL")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "ADD!" })).toBeDisabled();
	});

	it("shows error when URL is a duplicate", () => {
		setup({
			url: "https://example.com/rss",
			errors: {
				duplicate: "Feed already added",
			},
		});

		const input = screen.getByPlaceholderText("Add url");
		fireEvent.change(input, { target: { value: "https://example.com/rss" } });

		expect(screen.getByText("Feed already added")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "ADD!" })).toBeDisabled();
	});

	it("shows error when parse error occurs", () => {
		setup({
			url: "https://example.com/rss",
			errors: {
				parse: "Invalid RSS link",
			},
		});

		const input = screen.getByPlaceholderText("Add url");
		fireEvent.change(input, { target: { value: "https://example.com/rss" } });

		expect(screen.getByText("Invalid RSS link")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "ADD!" })).toBeDisabled();
	});
});
