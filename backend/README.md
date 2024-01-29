# REST API for student database

Before starting, make sure you have installed Node.js version 12 or higher.

To start the server, go to the repository folder and run the `node index` command. To stop, press CTRL+C. It is important to separate the server and client startup folders. Run the server folder as a separate project and the client folder separately.

After starting the server, the API will be available along the path `http://localhost:3000`.

## API Methods

All API methods that require a request body expect to receive the body as JSON. Responses from all methods are also returned as JSON.

* `GET /api/students` get a list of students. Parameters passed to the URL:
     * `search={search string}` search query; when passed, the method will return students whose first name, last name, patronymic, or the value of one of their contacts contains the specified substring
* `POST /api/students` create a new student. You need to pass the student's object in the body of the request. The response body of a successfully processed request will contain an object with the created student.
* `GET /api/students/{id}` get student data by ID. The response body of a successfully processed request will contain a student object.
* `PATCH /api/students/{id}` overwrite data about the student with the passed ID. The response body of a successfully processed request will contain an object with the updated student.
* `DELETE /api/students/{id}` delete a student by the passed ID.

## Student object structure

```javascript
{
   // Student ID, filled in automatically by the server, cannot be changed once created
   id: '1234567890',
   // date and time of student creation, filled in automatically by the server, cannot be changed after creation. This is useful information that may be required for further development of the application.
   createdAt: '2021-02-03T13:07:29.554Z',
   // date and time of student change, filled in automatically by the server when a student changes. This is useful information that may be required for further development of the application.
   updatedAt: '2021-02-03T13:07:29.554Z',
   // * required field, student name
   name: 'Vasily',
   // * required field, student's last name
   surname: 'Moscow',
   // * required field, student's middle name
   middleName: 'Vasilievich',
   // * required field, student’s date of birth (in date format. Read more about the functions of the Data object)
   dateOfBirth: '2000-03-03T13:07:29.554Z',
   // * required field, the year the student started studying
   yearStart: '2010',
   // * required field, faculty
   faculty: 'Historical',
}
```

## Possible response statuses

The server response may contain one of the response statuses:
* `200` - the request was processed normally
* `201` - the request to create a new element was successfully processed, and the Location response header contains a reference to the GET method for obtaining the created element
* `404` - the method passed in the request does not exist or the requested element was not found in the database
* `422` - the object passed in the request body did not pass validation. The response body contains an array with descriptions of validation errors:
   ```javascript
   [
     {
       field: 'Name of the object field in which the error occurred',
       message: 'An error message that can be shown to the user'
     }
   ]
  ```
* `500` - strange, but the server is broken :(
