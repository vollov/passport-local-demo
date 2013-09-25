curl -i http://10.100.78.111:3000/api/loggedin

curl -i http://10.100.78.111:3000/api/user
curl -i http://10.100.78.111:3000/api/logout

curl -i http://10.100.78.111:3000/api/login --data "password=passwd&email=mary@demo.org"

RESTful HTTP Post:
curl -X POST -d @filename http://hostname/resource

Posting data:
curl --data "param1=value1&param2=value2" http://hostname/resource


curl -i -d "password=passwd&email=mary@demo.org&submit=Login" --dump-header headers http://10.100.78.111:3000/api/login
curl -L -b headers http://10.100.78.111/


npm install supertest -g