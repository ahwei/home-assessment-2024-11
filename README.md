## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Next, copy the .env file and add your OpenAI API key. You can get your API key from [here](https://platform.openai.com/account/api-keys).

```sh
cp example.env .env
```

Update the .env file with your OpenAI API key:

```
OPENAI_API_KEY=your_open_ai_api_key_here
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
docker build -t mini-app .
docker run -p 3000:3000 mini-app
```

## Makefile

To build and run the project using Makefile:

```bash
make build
make run
```
