import { saveCV } from "./save-cv";
import { prisma } from "@/lib/prisma";
import { CvType } from "@/lib/types";
import { mockCv } from "@/lib/mock-data";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    cv: {
      upsert: jest.fn(),
    },
  },
}));

const mockUpsert = prisma.cv.upsert as jest.MockedFunction<
  typeof prisma.cv.upsert
>;

const mockData: CvType = JSON.parse(JSON.stringify(mockCv));

describe("saveCV", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should throw an error if userId is empty", async () => {
    await expect(saveCV("", mockData)).rejects.toThrow("userId is required");
    expect(mockUpsert).not.toHaveBeenCalled();
  });

  it("should call prisma.cv.upsert with correct arguments", async () => {
    const mockResult = {
      id: "1",
      userId: "user-123",
      data: mockData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockUpsert.mockResolvedValueOnce(mockResult);

    const result = await saveCV("user-123", mockData);

    expect(mockUpsert).toHaveBeenCalledTimes(1);
    expect(mockUpsert).toHaveBeenCalledWith({
      where: { userId: "user-123" },
      update: { data: mockData },
      create: { userId: "user-123", data: mockData },
    });
    expect(result).toEqual(mockResult);
  });

  it("should return the upserted cv on create", async () => {
    const mockResult = {
      id: "1",
      userId: "new-user",
      data: mockData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockUpsert.mockResolvedValueOnce(mockResult);

    const result = await saveCV("new-user", mockData);

    expect(result).toEqual(mockResult);
    expect(result.userId).toBe("new-user");
  });

  it("should return the upserted cv on update", async () => {
    const updatedData: CvType = {
      ...mockData,
      basicInfo: {
        ...mockData.basicInfo,
        fullName: "Jane Doe",
      },
    };
    const mockResult = {
      id: "1",
      userId: "existing-user",
      data: updatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockUpsert.mockResolvedValueOnce(mockResult);

    const result = await saveCV("existing-user", updatedData);

    expect(result).toEqual(mockResult);
    expect(result.data).toEqual(updatedData);
  });

  it("should throw if prisma.cv.upsert rejects", async () => {
    mockUpsert.mockRejectedValueOnce(new Error("Database error"));

    await expect(saveCV("user-123", mockData)).rejects.toThrow(
      "Database error"
    );
  });

  it("should not call upsert if userId is undefined", async () => {
    await expect(
      saveCV(undefined as unknown as string, mockData)
    ).rejects.toThrow("userId is required");
    expect(mockUpsert).not.toHaveBeenCalled();
  });
});
