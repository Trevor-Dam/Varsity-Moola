# Varsity-Moola Student Budgeting App
Varsity Moola is a budgeting app designed to encourage university students to be more financially savy by accurately predicting how much they can save in a month given their spending habits.
The app looks at transactions over the past three months to provide students with analytics that will inform them of future spending habits.

## Tools used
1. Mobile App
  * React Native
2. REST API
  * ASP.NET Core
  * .NET 8
3. Database
  * PostgreSQL

## How to run the system
1. Create a version of the database using the models provided, change the connection string to a PostgreSQL version that works locally on your machine
2. .NET
   - Ensure you have .NET 8 installed on your machine.
   - For Visual Studio: Simply open the solution file and simply run the http version of the app
   - For Terminal: Run using this command
     ```shell
     dotnet run
     ```
  3. React Native
     - Since the app is built using the Expo framework, run these two commands
       ```shell
       npm install
       npx expo start
       ```
