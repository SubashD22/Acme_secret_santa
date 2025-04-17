## Directory Structure

├── drop/ # Place input files here
├── processed/ # Processed files are moved here
├── result/ # Generated results are saved here

# Event Handling and File Processing Workflow

## Overview

The application implements an event-driven architecture to handle file processing. The main workflow is triggered when the required files are detected in the drop folder.

## File Monitoring system

The File monitor class extends the EventEmitter class and is used to monitor the drop folder for new files. It emits the 'filesFound' event when the required files are detected.

The `lookForFiles()` method:

- Scans the drop folder for required files
- Uses the fs module to read directory contents and filter files
- Specifically looks for:
  - Employee-List.xlsx
  - Secret-Santa-Game-Result.xlsx
- Emits 'filesFound' event when both files are found
- Returns the file paths of matched files
- Throws an error if multiple matching files are detected

The `startMonitoring()` method:

- Initiates file watching with a 5 second interval
- Runs on application launch
- Continues until explicitly stopped

The `stopMonitoring()` method:

- Stops the file monitoring process
- Clears the interval
- Resets the interval to null

## File Processing System

The FileProcessorService class is used to process the input files. It uses the xlsx library to read and parse the input files.

The `parseFile()` helper function:

- Takes a file path as parameter
- Reads the input files
- Converts the excel file to json
- Returns the parsed data

The `validateFile()` helper function:

- Takes the parsed data and the file type (employee or previousList) as parameters
- Validates the file structure and content based on the expected schema
- Returns true if the file is valid

The `processFiles()` method:

- Parses both input files using the `parseFile()` helper function
- Validates both files using the `validateFile()` helper function
- Loops through the previous list and creates a hashmap of employee email to secret child email
- Returns the employee data and the previous list hashmap

## Secret Santa Match Making System

The SecretSantaMatchMakingService class is used to create the secret santa matches. It uses the employee data and the previous list hashmap to create the matches.

The `matchEmployees()` method:

- Takes the employee data and the previous list hashmap as parameters
- Creates the secret santa matches
- it uses the fisher yates shuffle algorithm to shuffle the employees
- it ensures no employee is not matched with their secret child of previous year
- it ensures employee is not matched with themselves
- it returns the match list
- it throws an error if it fails to create the matches after 50 attempts.

## File Creation System

The FileCreateResultsService class is used to create the results file. It uses the match list to create the results file.

The `createResultsFile()` method:

- Takes the match list as parameter
- Creates the results file
- Saves the results file in the result folder

## File Movement System

The FileMovementService class is used to move the processed files to the processed folder. It uses the file paths to move the files.

The `moveToProcessed()` method:

- Takes the file paths as parameters
- Moves the files to the processed folder

## Main Event Handler: 'filesFound'

The `filesFound` event is emitted when both required files (Employee List and Previous Match History) are detected in the drop folder. This triggers the main processing workflow:

### Processing Steps

1. **Application Startup**

The monitoring process begins with:

fileMonitor.startMonitoring();

- Initiates file watching
- Runs on application launch
- Continues until explicitly stopped

2. **Monitoring Pause**

   - Temporarily stops file monitoring once the files are found to prevent duplicate processing
   - Ensures system resources are focused on current processing

3. **File Processing**

   - Parses both input files
   - Validates file structure and content
   - Returns processed employee data and previous match history

4. **Match Generation**

   - Creates new Secret Santa matches
   - Ensures no repeats from previous year
   - Validates match integrity

5. **Results Creation**

   - Generates new Excel file with matches
   - Timestamps the results
   - Saves in result folder

6. **File Organization**

   - Moves processed input files to processed folder
   - Maintains clean workspace

## Error Handling

The workflow includes comprehensive error handling:

- Catches and logs any errors during processing
- Ensures monitoring is stopped on error
- Prevents system from hanging

## User Interaction

After processing (success or failure), the application prompts for user input:

### Options:

- **Continue Monitoring (y/yes)**
  - Restarts the file monitoring process
  - System returns to watching for new files
- **Stop Application (n/no)**
  - Gracefully terminates the application
  - Provides restart instructions
