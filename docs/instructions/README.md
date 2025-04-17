# Running the Secret Santa Generator

## Requirements

- Node.js (v16 or higher)
- npm (v8 or higher)
- Git

## Getting Started

1. Clone the repository: `git clone https://github.com/your-repo/secret-santa-generator.git`
2. Navigate to the project directory: `cd secret-santa-generator`
3. Install dependencies: `npm install`

## Running the Application

1. Run the application: `npm start`

2. once the application is started, it will start monitoring the drop folder for the required files.

3. Drop the required files in the drop folder (Employee-List.xlsx and Secret-Santa-Game-Result.xlsx)

4. Once the files are dropped, the application will process the files and create the results file in the result folder (Secret-Santa-Game-Result.xlsx).

5. The processed files will be moved to the processed folder.

6. The application will prompt you to continue monitoring the drop folder for new files.

7. If you want to stop monitoring, press `n` when prompted.

8. To restart monitoring, press `y` when prompted and drop the required files again.
