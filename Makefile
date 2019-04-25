install:
	docker-compose --file docker/docker-compose.yml build --no-cache
	cp .githooks/* .git/hooks/

start:
	docker-compose --file docker/docker-compose.yml up

clean:
	docker-compose --file docker/docker-compose.yml stop
	docker-compose --file docker/docker-compose.yml down --rmi local --volumes --remove-orphans

ci-check-code-style:
	npm run check-code-style

ci-test:
	npm test -- --coverage

check-code-style:
	docker-compose --file docker/docker-compose.yml run --rm otn-ui npm run check-code-style

fix-code-style:
	docker-compose --file docker/docker-compose.yml run --rm otn-ui npm run fix-code-style

fix-code-style-diff:
	#docker-compose --file docker/docker-compose.yml run --rm otn-ui npm run fix-code-style-diff
	npm run fix-code-style-diff

test:
	docker-compose --file docker/docker-compose.yml run --rm otn-ui npm test -- --maxWorkers=1

coverage:
	docker-compose --file docker/docker-compose.yml run --rm otn-ui npm test -- --maxWorkers=1 --coverage

connect-shell:
	docker-compose --file docker/docker-compose.yml exec otn-ui bash

update-modules:
	npm i
	docker-compose --file docker/docker-compose.yml exec otn-ui npm i

build:
	NODE_ENV=production npm run build

build-electron-mac:
	NODE_ENV=production npm run package -- --mac

storybook-start:
	docker-compose --file docker/docker-compose.yml run --publish 6006:6006 --rm otn-ui npm run storybook

storybook-build:
	docker-compose --file docker/docker-compose.yml run --rm otn-ui npm run build-storybook