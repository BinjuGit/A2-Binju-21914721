
Binju's shared repository: https://github.com/BinjuGit/A2-Binju-21914721.git

#Assignment A
TASK 1 – USER INTERFACE CHANGES

1. Change the button label from contact component from "Delete" to "Delete Contact".

I changed the text in Contact.js, line 40
![alt text](image.png)

2. Change the button label in phone component from "Add" to e.g "Add Choiru's Phone".

For this, I changed the code in NewPhone.js, line 36
![alt text](image-1.png)

3. Change the placeholder text "Name" with input type text into a drop-down menu with 4 categories.

I changed the syntax in NewPhone.js, line 34
![alt text](image-5.png)

4. In the <tr> element of the table, change the label "Name" to "Phone Type".

I changed the text in PhoneList.js, line 14
![alt text](image-4.png)

TASK 2 – API COMMAND DEMONSTRATIONS

1. Show the API command for “Show Contact” and provide a screenshot of the output.

![alt text](image-6.png)

2. Show the API command for “Add Contact” and provide a screenshot of the output.

![alt text](image-7.png)

3. Show the API command for “Delete Contact” and provide a screenshot of the output.

![alt text](image-8.png)

4. Show the API command for “Update Contact” and provide a screenshot of the output.

![alt text](image-9.png)

5. Show the API command for “Show Phone” and provide a screenshot of the output.

![alt text](image-10.png)

6. Show the API command for “Add Phone” and provide a screenshot of the output.

![alt text](image-11.png)

7. Show the API command for “Delete Phone” and provide a screenshot of the output.

![alt text](image-12.png)

8. Show the API command for “Update Phone” and provide a screenshot of the output.

![alt text](image-13.png)

TASK 3 – DATABASE MODELING WITH SEQUELIZE AND TEST THE API COMMANDS WHEN THE 
DATABASE MODIFICATION DONE.
1.Modify the contacts

a. Change the syntax as follows in line   of app.js as belows in line 11 and 12.

![alt text](image-14.png)

b. Then adding code in model.js to add the address as follows:

![alt text](image-15.png)

Making changes in controller.js

![alt text](image-17.png)

2, Modify the Phones Table

a. Changing code in phone.model.js in line 8 and 11

![alt text](image-18.png)

b. Editing test phone.controller.js in line 8 and 9 as follows:

![alt text](image-19.png)

3. Adjust the Front-End 

a. Changes made on NewCOntact.js in line 6 and 33

![alt text](image-20.png)

![alt text](image-21.png)

Making chnages in NewPhone.js as below: 

![alt text](image-22.png)
![alt text](image-23.png)

Simply changing the text in Phone.js as follows:

![alt text](image-25.png)


4. Test All APIs related to table modified contacts and phones.

Showing Contacts

![alt text](image-27.png)

Showing contact having 'id' 3

![alt text](image-28.png)

Showing how to add address in contact

![alt text](image-29.png)













## Access Database
1 **Plsql Cheat Sheet:**
You can refer to the PostgreSQL cheat sheet [here](https://www.postgresqltutorial.com/postgresql-cheat-sheet/).

2 **Know the Container ID:**
To find out the container ID, execute the following command:
   ```bash
   docker ps
    9958a3a534c9   testsystem-nginx           "/docker-entrypoint.…"   6 minutes ago   Up 6 minutes   0.0.0.0:80->80/tcp   testsystem-nginx-1
    53121618baa4   testsystem-frontend        "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   3000/tcp             testsystem-frontend-1
    c89e46ac94b0   testsystem-api             "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   5000/tcp             testsystem-api-1
    9f4aea7cf538   postgres:15.3-alpine3.18   "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   5432/tcp             testsystem-db-1
   ```
3. Running the application

**docker compose command:**
   ```bash
   docker compose up --build
   ```

4 **Access postgreSQL in the container:**
Once you have the container ID, you can execute the container using the following command:
You will see the example of running the PostgreSQL inside the container.
   ```bash
   docker exec -it testsystem-db-1 psql -U postgres
   choiruzain@MacMarichoy TestSystem % docker exec -it testsystem-db-1 psql -U postgres                                       
   psql (15.3)
   Type "help" for help.
   
   postgres=# \dt
             List of relations
    Schema |   Name   | Type  |  Owner   
   --------+----------+-------+----------
    public | contacts | table | postgres
    public | phones   | table | postgres
   (2 rows)
  
    postgres=# select * from contacts;
    id |  name  |         createdAt         |         updatedAt         
   ----+--------+---------------------------+---------------------------
     1 | Helmut | 2024-08-08 11:57:57.88+00 | 2024-08-08 11:57:57.88+00
    (1 row)
    postgres=# select * from phones;
    id | phone_type |   number    | contactId |         createdAt          |         updatedAt          
   ----+------------+-------------+-----------+----------------------------+----------------------------
     1 | Work       | 081431      |         1 | 2024-08-08 11:59:04.386+00 | 2024-08-08 11:59:04.386+00


postgres=# select * from contacts;
   ```
Replace `container_ID` with the actual ID of the container you want to execute.

## Executing API

### Contact API


1. Add contacts API  (POST)
```bash
http post http://localhost/api/contacts name="Choiru"
        
choiruzain@MacMarichoy-7 TestSystem % http post http://localhost/api/contacts name="Choiru"
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: keep-alive
Content-Length: 102
Content-Type: application/json; charset=utf-8
Date: Thu, 08 Aug 2024 21:01:53 GMT
ETag: W/"66-FmPYAaIkyQoroDwP2JsAZjWTAxs"
Server: nginx/1.25.1
Vary: Origin
X-Powered-By: Express

{
"createdAt": "2024-08-08T21:01:53.017Z",
"id": 1,
"name": "Choiru",
"updatedAt": "2024-08-08T21:01:53.017Z"
}

```
2 Get contacts API  (GET)

```bash
http get http://localhost/api/contacts


choiruzain@MacMarichoy-7 TestSystem % http get http://localhost/api/contacts
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: keep-alive
Content-Length: 104
Content-Type: application/json; charset=utf-8
Date: Thu, 08 Aug 2024 21:04:58 GMT
ETag: W/"68-V+4KuL2xahYt8YAkKG6rKdR7wHg"
Server: nginx/1.25.1
Vary: Origin
X-Powered-By: Express

[
{
"createdAt": "2024-08-08T21:01:53.017Z",
"id": 1,
"name": "Choiru",
"updatedAt": "2024-08-08T21:01:53.017Z"
}
]


```
3. Show/create the API commmand to delete the contacts (DELETE)

```bash





```

4. Show/create the API command to edit the contacts (PUT)
```
http get http://localhost/api/contacts/1/phones

```

### Phone API