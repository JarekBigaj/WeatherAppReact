start_frontend:
	yarn start

compile_backend:
	cd packages/backend && npx tsc

start_backend:
	yarn backend_start