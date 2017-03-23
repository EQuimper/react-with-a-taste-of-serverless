## For Deploy

`sls deploy`

## Test

### Notes

#### Create
`sls webpack invoke --function notes_create --path notes/event-tests/create.json`

#### Get By Id
`sls webpack invoke --function notes_get --path notes/event-tests/get.json`

#### List
`sls webpack invoke --function notes_list --path notes/event-tests/list.json`

#### Update
`sls webpack invoke --function notes_update --path notes/event-tests/
update.json`

#### Delete
`sls webpack invoke --function notes_delete --path notes/event-tests/
delete.json`

---

## Endpoint

POST - https://l1od9is7mj.execute-api.us-east-1.amazonaws.com/prod/notes
GET - https://l1od9is7mj.execute-api.us-east-1.amazonaws.com/prod/notes/{id}
GET - https://l1od9is7mj.execute-api.us-east-1.amazonaws.com/prod/notes
PUT - https://l1od9is7mj.execute-api.us-east-1.amazonaws.com/prod/notes/{id}
DELETE - https://l1od9is7mj.execute-api.us-east-1.amazonaws.com/prod/notes/{id}
