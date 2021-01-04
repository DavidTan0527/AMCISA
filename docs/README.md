# AMCISA API documentation
- [AMCISA API documentation](#amcisa-api-documentation)
- [Error](#error)
- [User](#event)
  - [Login](#login)
  - [Create User](#create-user)
  - [Get Users](#get-users)
  - [Update User](#update-user)
  - [Delete User](#delete-user)
- [Event](#event)
  - [Get Events](#get-events)
  - [Create Event](#create-event)
  - [Get Event](#get-event)
  - [Update Event](#update-event)
  - [Delete Event](#delete-event)
- [Contact](#contact)
  - [Get Contact](#get-contact)
  - [Create Contact](#create-contact)
- [FOC](#foc)
  - [Get FOC](#get-foc)
  - [Create FOC](#create-foc)
- [QNA](#qna)
  - [Get QNA](#get-qna)
  - [Create QNA](#create-qna)
- [Maincomm](#maincomm)
  - [Get Maincomm](#get-maincomm)
  - [Create Maincomm](#create-maincomm)
- [Landing](#landing)
  - [Get Landing](#get-landing)
  - [Create Landing](#create-landing)
- [Main](#main)
  - [Get Main](#get-main)
  - [Create Main](#create-main)

# Error
Errors that might occurs.

```json
- 404 Not Found
{
	"error": {
		"status"  : "404",
		"message" : "Not Found."
	}
}
- 500 Internal Server Error
```

# User
User api.

## Login

Login a user

POST `/login`

* **Request Body**

```{json}
{
    "username" : string,
    "password" : string
}
```

* **Result**

```{json}
{
    "token" : string
}
```

## Create User
Create a user 

POST `/user`

* **Authorization**
```
Bearer <token>
```

* **Request Body**

```{json}
{
    "uni" : {"nus","ntu"},
    "username" : string,
    "password" : string
}
```

* **Result**

```{json}
Success
```

## Get Users

Get users

Get `/user`

* **Authorization**
```
Bearer <token>
```

* **Result**

```{json}
[
    {
        "id" : int
        "uni" : {"nus","ntu"},
        "username" : string,
    }, ...
]

```

## Update User

Update a user

PUT `/user`

* **Authorization**
```
Bearer <token>
```

* **Request Body**

```{json}
{
    "id" : int,
    "uni" : {"nus","ntu"},
    "username" : string,
    "password" : string
}
```

* **Result**

```{json}
{
    "token" : string
}
```

## Delete User

Delete a user

DELETE `/user`

* **Authorization**
```
Bearer <token>
```

* **Request Body**

```{json}
{
    "id" : int,
}
```

* **Result**

```{json}
Success
```

# Event
Event api.

## Get Events

Get the events grouped according to the parameters `count`.

GET `/:uni/events/:count`

* **Parameters**
  
```{json}
{
    "uni" : {"nus","ntu"}
    "count" : int
}
```

* **Result**

```{json}
[
    {   
        "id" : int,
        "title" : string,
        "picture" : filePath,
        "event_date" : string,
        "venue" : string,
        "author" : string,
        "created_date" : string,
        "content" : string
    }, ...
]
```

## Create Event
Create a event 

POST `/:uni/event`

* **Authorization**
```
Bearer <token>
```

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
}
```

* **Request Body**

```{json}
{   
    "title" : string,
    "picture" : filePath,
    "event_date" : string,
    "venue" : string,
    "author" : string,
    "created_date" : string,
    "content" : string
}
```

* **Result**

```{json}
Success
```

## Get Event

Get a specific event according to `id`

GET `/:uni/event/:id`

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
    "id" : int
}
```

* **Result**

```{json}
{   
    "id" : int,
    "title" : string,
    "picture" : filePath,
    "event_date" : string,
    "venue" : string,
    "author" : string,
    "created_date" : string,
    "content" : string
}
```

## Update Event
Update a event 

PUT `/:uni/event`

* **Authorization**
```
Bearer <token>
```

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
}
```

* **Request Body**

```{json}
{   
    "id" : int,
    "title" : string,
    "picture" : filePath,
    "event_date" : string,
    "venue" : string,
    "author" : string,
    "created_date" : string,
    "content" : string
}
```

* **Result**

```{json}
Success
```

## Delete Event
Delete a event 

DELETE `/:uni/event`

* **Authorization**
```
Bearer <token>
```

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
}
```

* **Request Body**

```{json}
{   
    "id" : int
}
```

* **Result**

```{json}
Success
```

# Contact
Contact api


## Get Contact

Get Contact details.

GET `/:uni/contact`

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
}
```

* **Result**
  
```{json}
{
    "mail": { 
      "name": string, 
      "to": url, 
    },
    "instagram": { 
      "name": string, 
      "to": url, 
    },
    "facebook": { 
      "name": string, 
      "to": url, 
    },
    "youtube": { 
      "name": string, 
      "to": url, 
    },
}
```

## Create Contact

Create Contact.

POST `/:uni/contact`

* **Authorization**
```
Bearer <token>
```

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
}
```

* **Request Body**
  
```{json}
{
    "mail": { 
      "name": string, 
      "to": url, 
    },
    "instagram": { 
      "name": string, 
      "to": url, 
    },
    "facebook": { 
      "name": string, 
      "to": url, 
    },
    "youtube": { 
      "name": string, 
      "to": url, 
    },
}
```

* **Result**
```
Success
```

# FOC
FOC(Freshman Orientation Camp) api

## Get FOC

Get FOC details.

GET `/:uni/foc`

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
}
```

* **Result**
  
```{json}
{
    "picture": filePath,
    "title": string,
    "intro_video": url,
    "content": richText,
    "registration": {
        "date": string,
        "venue": string,
        "fees": string,
        "deadline": string,
        "form_link": url
    },
    "activities": richText
}
```

## Create FOC

Create Foc.

POST `/:uni/foc`

* **Authorization**
```
Bearer <token>
```

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
}
```

* **Request Body**
  
```{json}
{
    "picture": filePath,
    "title": string,
    "intro_video": url,
    "content": richText,
    "registration": {
        "date": string,
        "venue": string,
        "fees": string,
        "deadline": string,
        "form_link": url
    },
    "activities": richText
}
```

* **Result**
```
Success
```

# QNA
QNA api.

## Get QNA

Get QNA details

GET `/:uni/qna`

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
}
```

* **Result**

```{json}
[
    {   
        "question" : richText,
        "answer" : richText
    }, ...
]
```

## Create QNA

Create QNA.

POST `/:uni/qna`

* **Authorization**
```
Bearer <token>
```

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
}
```

* **Request Body**
  
```{json}
{
    "picture": filePath,
    "title": string,
    "intro_video": url,
    "content": richText,
    "registration": {
        "date": string,
        "venue": string,
        "fees": string,
        "deadline": string,
        "form_link": url
    },
    "activities": richText
}
```

* **Result**
```
Success
```

# Maincomm
Maincomm api.

## Get Maincomm

Get Maincomm details

GET `/:uni/maincomm`

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
}
```

* **Result**


```{json}
{
    "title": string,
    "pres_picture": filePath,
    "caption": string,
    "member": [
        {
            "id": int,
            "picture": filePath,
            "position": string,
            "course_year": string
        }, ...
        
    ]
    
}
```

## Create Maincomm

Create Maincomm.

POST `/:uni/maincomm`

* **Authorization**
```
Bearer <token>
```

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
}
```

* **Request Body**
  
```{json}
{
    "title": string,
    "pres_picture": filePath,
    "caption": string,
    "member": [
        {
            "id": int,
            "picture": filePath,
            "position": string,
            "course_year": string
        }, ...
        
    ]
    
}
```

* **Result**
```
Success
```

# Landing
Landing page api. 

## Get Landing

Get Landing Details. Only 3 latest events are shown and they are arranged in descending order of dates.

GET `/:uni/landing`

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
}
```

* **Result**

```{json}
{
    "notify_foc": bool,
    "events": [
      {
        "title": string,
        "picture": filePath,
        "event_date": string
      },...
    ],
    "admission": [
      {
        "title": "string",
        "content": richText
      },...
    ]
}
```

## Create Landing

Create Landing.

POST `/:uni/landing`

* **Authorization**
```
Bearer <token>
```

* **Parameters**

```{json}
{
    "uni" : {"nus","ntu"}
}
```

* **Request Body**
  
```{json}
{
    "notify_foc": bool,
    "events": [
      {
        "title": string,
        "picture": filePath,
        "event_date": string
      },...
    ],
    "admission": [
      {
        "title": "string",
        "content": richText
      },...
    ]
}
```

* **Result**
```
Success
```

# Main
Main page api.

## Get Main

Get Main Page Details

GET `/main`

* **Result**

```{json}
{
    "quote" : string,
    "about" : string,
    "Explore" : string
}
```

## Create Main

Create Main.

POST `/main`

* **Authorization**
```
Bearer <token>
```

* **Request Body**
  
```{json}
{
    "quote" : string,
    "about" : string,
    "Explore" : string
}
```

* **Result**
```
Success
```
