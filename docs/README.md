# AMCISA API documentation
- [AMCISA API documentation](#amcisa-api-documentation)
- [Error](#error)
- [Event](#event)
  - [Get Events](#get-events)
  - [Get Event](#get-event)
- [FOC](#foc)
  - [Get FOC](#get-foc)
- [Landing](#landing)
- [Maincomm](#maincomm)
- [Nus-Landing](#nus-landing)

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

# Event
Event api.

## Get Events

Get the events grouped according to the parameters `count`.

GET `/events/:count`

* **Parameters**
  
```{json}
{
    "count" : int
}
```

* **Result**

```{json}
[
    [
        {   
            "id" : 1,
            "title" : "Supper Night",
            "picture" : "Url",
            "event_date" : "21/10/2020",
            "venue" : "Ameen",
            "author" : "David Tan",
            "created_date" : "24/10/2020",
            "content" : "bla bla"
        },
        
        {   "id" : 2,
            "title" : "Supper Night2",
            "picture" : "Url",
            "event_date" : "21/10/2020",
            "venue" : "Ameen",
            "author" : "David Tan",
            "created_date" : "24/10/2020",
            "content" : "bla bla"
        }
    ], ...
]
```

## Get Event

Get a specific event according to `id`

GET `/event/:id`

* **Parameters**

```{json}
{
    "id" : int
}
```

* **Result**

```{json}
{
    "id" : 2,
    "title" : "Supper Night2",
    "picture" : "Url",
    "event_date" : "21/10/2020",
    "venue" : "Ameen",
    "author" : "David Tan",
    "created_date" : "24/10/2020",
    "content" : "bla bla"
}
```

# FOC
FOC(Freshman Orientation Camp) api

## Get FOC

Get FOC details.

GET `/foc`

* **Result**
  
```{json}
{
    "picture": "url",
    "picture_title": "《贰迁〇亿》\n AMCISA FOC 20/21",
    "FOC":{
        "title": "What is FOC?",
        "video": "zhishinn_youtube url",
        "content": "bla bla bla",
        "ticket": {
            "date": "1/8 - 6/8/2020",
            "venue": "NUS Campus",
            "fees": "RM20",
            "deadline": "31/3/2020"
        },
        "camp_activities":{
            "1": "bla bla bla",
            "2": "bla bla bla",
            "3": "bla bla bla",
            "4": "bla bla bla"
        }
    }   
}
```

# Landing
Landing api.

GET `/landing`

* **Result**

```{json}
{
    "quote" : "Where no one is left behind",
    "about" : "Hello Hello Hello",
    "Explore" : "We operate differently...."
}
```

# Maincomm
Maincomm api.

GET `/maincomm`

* **Result**


```{json}
{
    "title": "20/21 MAIN COMM",
    "pres_picture": "url",
    "caption": "Regardless of the adversities....",
    "member": [
        {
            "id": 1,
            "picture": "url",
            "position": "bla bla",
            "course_year": "Y2 chem eng"
        }, ...
        
    ]
    
}
```

# Nus-Landing
nus landing page api. Only 3 latest events are shown and they are arranged in descending order of dates.

GET `/nus-landing`

* **Result**

```{json}
{
    "admission": [
        {
            "title": "step1",
            "content": "bla bla bla"
        }, 
        {
            "title": "step2",
            "content": "bla bla bla"
        }, ...
    ],
    "contact_us": {
            "mail": "nusamcisa@gmail.com",
            "instagram": "@nusamcisa",
            "facebook": "@amcisanusntu",
            "youtube": "nusamcisa foccom"
    },
    "events": [
        {   
            "picture" : "Url",
            "event_date" : "21/10/2020",
        },
        {   
            "picture" : "Url",
            "event_date" : "21/10/2020",
        },
        {   
            "picture" : "Url",
            "event_date" : "21/10/2020",
        }
    ]
}
```

# Nus-Landing
qna api.

GET `/qna`

* **Result**

```{json}
{
    "data" : [
        {   
            "question" : "How's life in nus?",
            "answer" : "bla bla bla"
        },
        {   
            "question" : "How to register modules in nus?",
            "answer" : "bla bla bla"
        },
        {   
            "question" : "How to join cca in nus?",
            "answer" : "bla bla bla"
        }        
    ]
}
```
