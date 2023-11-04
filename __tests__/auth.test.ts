import { register } from "../controllers/auth.controllers";
import { Request, Response } from "express";
import { IUserRequest } from "../models/user";


const mockRequest = {
  body: {
    firstName: "Lan",
    lastName: "Ho",
    email: "h.baolan20025@gmail.com",
    password: "123456789",
  },
} as unknown as Request<IUserRequest>

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response


const mockNext = jest.fn();

const mockDb = {
    where: jest.fn(),
    first: jest.fn(),
    insert: jest.fn()
};

jest.mock("../config/database", () => {
    return {
        __esModule: true,
        default: () => mockDb
    };
});

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword')
}));

describe("Sign up",  () => {
    it('should register a new user', async () => {
        mockDb.where.mockReturnValueOnce({
            first: jest.fn().mockResolvedValueOnce(null)
        });
        
        mockDb.insert.mockReturnValueOnce([1]);

        await register(mockRequest, mockResponse, mockNext)

        expect(mockDb.where).toHaveBeenCalledWith('email', 'h.baolan20025@gmail.com');
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            id: 1,
            firstName: 'Lan',
            lastName: 'Ho',
            email: 'h.baolan20025@gmail.com',
            displayName: 'Lan Ho'
        });
    })
});
