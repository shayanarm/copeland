FROM node:20-bullseye

# Install pnpm
ENV SHELL="/bin/bash"
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN corepack enable

# RUN apt update && apt install -y protobuf-compiler

RUN pnpm setup

USER root