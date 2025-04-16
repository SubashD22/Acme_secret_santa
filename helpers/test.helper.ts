export const testEmployeeList = [
  { Employee_Name: 'John Doe', Employee_EmailID: 'john.doe@example.com' },
  { Employee_Name: 'Jane Doe', Employee_EmailID: 'jane.doe@example.com' },
  { Employee_Name: 'Jim Doe', Employee_EmailID: 'jim.doe@example.com' },
  { Employee_Name: 'Jill Doe', Employee_EmailID: 'jill.doe@example.com' },
  { Employee_Name: 'Jack Doe', Employee_EmailID: 'jack.doe@example.com' },
  { Employee_Name: 'James Doe', Employee_EmailID: 'james.doe@example.com' },
  { Employee_Name: 'Julia Doe', Employee_EmailID: 'julia.doe@example.com' },
  { Employee_Name: 'Jason Doe', Employee_EmailID: 'jason.doe@example.com' },
  { Employee_Name: 'Janet Doe', Employee_EmailID: 'janet.doe@example.com' },
  { Employee_Name: 'Justin Doe', Employee_EmailID: 'justin.doe@example.com' }
];

export const testPreviousListHashMap = new Map<string, string>([
  ['janet.doe@example.com', 'jim.doe@example.com'],
  ['jason.doe@example.com', 'jane.doe@example.com'],
  ['jim.doe@example.com', 'julia.doe@example.com'],
  ['justin.doe@example.com', 'john.doe@example.com'],
  ['julia.doe@example.com', 'james.doe@example.com'],
  ['jane.doe@example.com', 'janet.doe@example.com'],
  ['james.doe@example.com', 'jill.doe@example.com'],
  ['john.doe@example.com', 'jason.doe@example.com'],
  ['jill.doe@example.com', 'justin.doe@example.com'],
  ['jack.doe@example.com', 'jack.doe@example.com'],
]);

export const noMatchTestList = [
  { Employee_Name: 'John Doe', Employee_EmailID: 'john.doe@example.com' },
  { Employee_Name: 'Jane Doe', Employee_EmailID: 'jane.doe@example.com' },
];

export const noMatchTestHashMap = new Map<string, string>([
  ['john.doe@example.com', 'jane.doe@example.com'],
  ['jane.doe@example.com', 'john.doe@example.com'],
]);