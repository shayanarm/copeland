FROM node:20-bullseye

# Install pnpm
ENV SHELL="/bin/bash"
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN corepack enable

RUN pnpm setup

WORKDIR backend
COPY package.json package.json

RUN pnpm install

COPY . .

RUN pnpm build

CMD ["pnpm", "start"]