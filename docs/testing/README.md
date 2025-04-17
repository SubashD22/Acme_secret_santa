# Testing Documentation

## Running Tests

The application includes comprehensive test suites that can be run using the following npm commands:

- Run all tests: `npm run test`
- Run match-making tests only: `npm run test:match-making`
- Run file validation tests only: `npm run test:validation`
- Run file processing tests only: `npm run test:processing`

## Test Cases

### Secret Santa Match Making Tests

Tests the core matching algorithm functionality in `secret-santa-match-making.service.ts`:

- Verifies that all employees are matched with a Secret Santa
- Ensures no employee is matched with themselves
- Validates that no matches repeat from previous year
- Confirms the matching algorithm handles edge cases
- Tests error handling when matches cannot be made after max attempts

### File Validation Tests

Tests input file validation logic in `file-validation.helper.ts`:

- Validates Employee List file structure and required columns
- Validates Previous List file structure and required columns
- Tests handling of invalid/malformed files
- Verifies error messages for missing required fields
- Checks validation of file name patterns

### File Processing Tests

Tests file processing functionality in `file-processing.service.ts`:

- Tests successful parsing of Excel files
- Verifies correct creation of previous matches hashmap
- Validates handling of empty files
- Tests error handling for corrupted files
- Confirms proper processing of multiple file formats
