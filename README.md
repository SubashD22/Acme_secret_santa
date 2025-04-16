# Secret Santa Generator

An automated system for managing Secret Santa gift exchanges in organizations. This application monitors a drop folder for employee lists and previous Secret Santa assignments, generates new non-repeating matches, and creates result files while maintaining complete history.

## Features

- Automated file monitoring of drop folder
- Excel file processing for employee lists and previous assignments
- Prevents repeat Secret Santa assignments from previous years
- Generates and saves results in Excel format
- Moves processed files to archive folder
- Error handling and validation

## File Requirements

### Employee List File

- Filename must start with `Employee-List` and end with `.xlsx`
- Must contain columns:
  - Employee_Name
  - Employee_EmailID

### Previous List File

- Filename must start with `Secret-Santa-Game-Result` and end with `.xlsx`
- Must contain columns:
  - Employee_Name
  - Employee_EmailID
  - Secret_Child_Name
  - Secret_Child_EmailID

## Documentation

For detailed technical documentation, please see [Documentation](docs/documentation/README.md).

For user instructions and guides, please see [Instructions](docs/instructions/README.md).
