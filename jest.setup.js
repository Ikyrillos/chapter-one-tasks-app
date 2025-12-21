// Mock the random values library
import 'react-native-get-random-values';

// Mock the dependencies
jest.mock('react-native-get-random-values', () => ({
  getRandomBase64: jest.fn(),
}));

// FIX: Mock uuid to bypass the "Unexpected token export" error
jest.mock('uuid', () => ({
  v4: () => '1234-5678-unique-id', 
}));