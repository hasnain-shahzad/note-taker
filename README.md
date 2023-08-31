# Note-Taker App

Welcome to Note-Taker! 
This is a Node.js application that allows you to take notes and manage them effortlessly. 
Follow the steps below to get started.

## Prerequisites

- **Docker**: Ensure you have Docker installed on your system. You can download Docker from the official website or through the command line:

  ```sh
  # Command to download Docker (CLI)
  $ curl -fsSL https://get.docker.com -o get-docker.sh
  $ sh get-docker.sh


 ## Getting Started
1. Clean Ports: 
Before running the application, make sure that ports 3306, 6379, and 3000 are not being used by any other process.

2. Change Env:
Please change DB_HOST and REDIS_HOST in .env file in project root folder to the correspondent ip assigned to your system at the moment before running application. 

3. Docker Build: 
To build the Note-Taker application, run the following command in your terminal:
docker-compose up -d
This will create and start the necessary Docker containers for the application.

4. API Collection: 
In the postman_api_collection folder located in the root of the project, you will find a Postman collection JSON file (Notetaker.postman_collection.json).
Import this JSON file into Postman.
Make a local env and set server_url and user_jwt env variables accordingly preferrabley to http://localhost:3000/api and user token obtained on login.

5. Open Postman:
Click on "Import" in the top-left corner.
Select the JSON file (note-taker-api-collection.json) from the postman_api_collection folder.
The imported collection will appear in your Postman workspace.

6. Start Using APIs: 
With the imported collection in Postman, you can now explore and interact with the Note-Taker APIs. Send requests to create, retrieve, update, and delete notes seamlessly!