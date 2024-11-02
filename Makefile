# Build the Docker image
build:
	@docker build -t min-app .

# Run the Docker container
run:
	@docker run -p 3000:3000 min-app
