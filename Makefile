CONTAINER = car-dealership:0.0.1



.PHONY: build
build:
	docker build . -t ${CONTAINER}


.PHONY: unittest
unittest:
	yarn test


.PHONY: test
test:
	yarn test:e2e


.PHONY: run
run:
	docker-compose up -d


.PHONY: stop
stop:
	docker-compose down