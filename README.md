## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

To build and run the Docker container:

```bash
docker build -t min-app .
docker run -p 3000:3000 min-app
```

## Makefile

To build and run the project using Makefile:

```bash
make build
make run
```
