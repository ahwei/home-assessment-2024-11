# Build the Docker image
build:
	@docker build -t mini-app .

# Run the Docker container
run:
	@docker run -p 3000:3000 mini-app
