all:
	echo 'nothing to do, try start or deploy'

backend:
	pushd api ; aws --profile slscode cloudformation package --template-file site-template.yml --s3-bucket sam-artifacts-509803855674-us-east-2 --output-template-file ../packaged.template.yml
	formica change --profile slscode --region us-east-2 --stack vigor-dev --capabilities CAPABILITY_NAMED_IAM --parameters Stage=dev && formica deploy --profile slscode --region us-east-2 --stack vigor-dev
frontend:
	rm -rf vigor/build || true
	pushd vigor ; yarn run build
	pushd vigor/build ; aws s3 --profile slscode sync --acl public-read --delete . s3://vigor-dev-staticsitebucket-1n5jgthz8o4rx

deploy: backend frontend
