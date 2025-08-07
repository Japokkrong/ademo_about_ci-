# Testing Guide

This project includes comprehensive tests for the `useCounter` custom React hook.

## Test Framework Setup

The project uses:
- **Vitest** - Fast unit test framework for Vite projects
- **React Testing Library** - For testing React hooks and components
- **jsdom** - Browser environment simulation for testing

## Running Tests

### All Tests
```bash
npm test                 # Run tests in watch mode
npm run test:run         # Run tests once and exit
npm run test:ui          # Run tests with UI interface
npm run test:coverage    # Run tests with coverage report
```

## Test Structure

The test file `tests/useCounter.spec.ts` covers:

### 1. Initial State Tests
- Verifies initial `count` value (0)
- Verifies initial `val` value (1)
- Ensures all required functions are provided

### 2. Increment Functionality Tests
- Tests basic increment behavior
- Tests multiple increments
- Tests increment with custom values
- Tests increment behavior after value changes

### 3. Val State Management Tests
- Tests `setVal` functionality
- Tests edge cases (0, negative values, large values)

### 4. Complex Scenarios
- Tests multiple operations in sequence
- Tests state independence between hook instances
- Tests rapid successive operations

### 5. Edge Cases
- Tests decimal values
- Tests string type handling
- Tests NaN handling

## Test Configuration Files

- `vitest.config.ts` - Main test configuration
- `tests/setup.ts` - Global test setup
- Package.json includes test scripts and dependencies

## useCounter Hook API

The `useCounter` hook provides:

```typescript
const { count, increment, val, setVal } = useCounter();
```

- `count: number` - Current counter value
- `increment: () => void` - Function to increment count by current val
- `val: number` - Current increment value  
- `setVal: (newVal: number) => void` - Function to update increment value
```
