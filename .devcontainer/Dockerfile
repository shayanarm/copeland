FROM node:20-bullseye

# Install pnpm
ENV SHELL="/bin/bash"
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN corepack enable

RUN pnpm setup

USER root