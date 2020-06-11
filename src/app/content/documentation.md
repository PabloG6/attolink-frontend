
# Quick Start

#### Curl Example

```bash
    curl -X GET "https://api.teenielink.dev/v1/preview?url=https://example.com" 
     --user "apikey: YOUR API KEY"        
```



#### Javascript Example
 ```javascript
    const data = {url: 'https://example.com'};
    const url = 'https://api.teenielink.dev/v1/preview';
    const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'apikey': 'YOUR API KEY'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
```

#### Python Example
```python
import requests
headers = {'content-type': 'application/json', 'apikey': 'YOUR API KEY'}
payload = {'url': 'https://example.com'}
r = requests.get('https://api.teenielink.dev/v1/preview', params=payload, headers=headers)
print(r)
```


#### Response Example
```json
    {
        "data": { 
            "description": "Example Domain", 
            "images": [], 
            "original_url": "https://example.com",
            "title": "Example Domain", 
            "website_url": "example.com" 
                   
        } 
    }
```
