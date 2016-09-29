# JSON-TOOLS

Simple tools for simple tasks!

Check the [demo](#).



## jsonKeys

API is:

```javascript
// calling
jsonKeys({
	"req": {
		"method": "GET",
		"url": "https://store.com/navigation/f61b4105-9015-42a9-af2b-89a693f8c21d",
		"headers": {
			"user-agent": "node-superagent/2.2.0",
			"accept": "application/json"
		}
	},
	"header": {
		"cache-control": "no-cache",
		"content-type": "application/json; charset=utf-8",
		"date": "Thu, 29 Sep 2016 09:16:25 GMT",
		"content-length": "43"
	},
	"status": 404,
	"text": "{\r\n  \"meta\": {\r\n    \"httpCode\": 404\r\n  }\r\n}"
});

// returns
[
  ".req",
  ".req.method",
  ".req.url",
  ".req.headers",
  ".req.headers['user-agent']",
  ".req.headers.accept",
  ".header",
  ".header['cache-control']",
  ".header['content-type']",
  ".header.date",
  ".header['content-length']",
  ".status",
  ".text"
]
```


## jsonDiff

API is:

```javascript
// calling
var A = {a:'b', z:[1, 2, 3]},;
var B = {a:'c', d:1, z:[1, 2, 4]};
jsonDiff(A, B);

// returns
{
  "onlyA": {},
  "onlyB": {
    ".d": 1
  },
  "valuesDiffer": {
    ".a": {
      "a": "b",
      "b": "c"
    },
    ".z[2]": {
      "a": 3,
      "b": 4
    }
  }
}
```

Note: for the moment object keys order depend on the JS engine used.


## json2js

API is:

```javascript
// calling
json2js({
	"req": {
		"method": "GET",
		"url": "https://store.com/navigation/f61b4105-9015-42a9-af2b-89a693f8c21d",
		"headers": {
			"user-agent": "node-superagent/2.2.0",
			"accept": "application/json"
		}
	},
	"header": {
		"cache-control": "no-cache",
		"content-type": "application/json; charset=utf-8",
		"date": "Thu, 29 Sep 2016 09:16:25 GMT",
		"content-length": "43"
	},
	"status": 404,
	"text": "{\r\n  \"meta\": {\r\n    \"httpCode\": 404\r\n  }\r\n}"
});

// returns
`{
  req: {
    method: 'GET',
    url: 'https://store.com/navigation/f61b4105-9015-42a9-af2b-89a693f8c21d',
    headers: {
      'user-agent': 'node-superagent/2.2.0',
      accept: 'application/json'
    }
  },
  header: {
    'cache-control': 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    date: 'Thu, 29 Sep 2016 09:16:25 GMT',
    'content-length': '43'
  },
  status: 404,
  text: '{\r\n  \"meta\": {\r\n    \"httpCode\": 404\r\n  }\r\n}'
}`
```

Note: for the moment object keys order depend on the JS engine used.
