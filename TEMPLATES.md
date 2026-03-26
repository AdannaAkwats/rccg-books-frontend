## Schema 
```
{
  "id": "ss-2025-01",
  "header": "Lessons  •  Student & Teacher"
  "type": "sunday_school",
  "title": "Sunday School Manual 2025",
  "sections": [
    {
      "type": "lesson",
      "content": { "number": 1, "date": "1st January 2025", "title": "Faith Basics" }
    },
    {
      "type": "memory_verse",
      "content": { "text": "Hebrews 11:1", "verse": "Now faith is..." }
    },
    {
      "type": "introduction",
      "content": "This lesson explores..."
    },
    {
      "type": "outline",
      "content": ["Point 1: Definition", "Point 2: Examples"]
    },
    {
      "type": "conclusion",
      "content": "In summary..."
    },
    {
      "type": "workbook_activities",
      "content": ["Question 1: What is faith?", "Activity: Discuss in groups"]
    }
  ]
}
```




### Sunday School 
```
// Chapter 
- Lesson <number>
- Date Xth <month> <2025>
- Title 
- Memory verse
- Bible passage
- Introduction 
- Outlines 
- <Outine>
- <Outline ....>
- Conclusion 
- Further reading
- Workbook activites / questions 
```

### Workers-in-training Manual 
```
// Chapter 
 - Introduction 
 - Module <number>
 - Conclusion
- Title 
- <Body>
- Fig 1.2 (images / tables)
```
// Thoughts - storing in ddb but what if the chapters / sections are really long?
-> we can save the json in s3 instead of ddb
```
{
  "id": workers-in-training-aug-2023", 
  "label": "Training manual",
  "description": "Being a worker in RCCG",
  "type": "workers_in_training",
  "title": "Workers in Training",
  "sections": [
    {
      "type": "chapter",
      "content": { 
        "label": "module", 
        "number": 1, 
        "date": "1st January 2025", 
        "title": "Faith Basics",
        "structure": [
            {
                "type": "body",
                "content": "...."
            },
            {
                "type": "image",
                "content": "...."
            }
        ]
      }
    },
    ....
    {
      "type": "chapter",
      "content": { 
        "label": "introduction", 
        "number": 1, 
        "date": "1st January 2025", 
        "title": "Faith Basics",
        "structure": [
            {
                "type": "body",
                "content": "...."
            },
            {
                "type": "image",
                "content": "...."
            }
        ]
      }
    },
  ]
}
```

### Open heavens 
```
// Date
- Date 
- Title 
- Memorise <bible text>
- Read <bible verse>
- <Body>
- Bible in one year
- Hymn 
- Action point / Key Point / Prayer point
```


