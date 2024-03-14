# Docusarus Versioning with Git - Template

This is a template for a Docusarus site that uses Git for versioning. We recommend you read the blog post [_When Docs and a Dinosaur Git Along_]() to understand the motivation behind this template and why we, at Spectro Cloud, chose to use Git for versioning.

<p align="center">
  <img src="./static/img/readme-image.png" alt="Docusarus + heart with Spectro Cloud Astronaut + git" width="400"/>
</p>

## Getting Started

To use this template, click the `Use this template` button at the top of the repository. This will create a new repository in your account with the same files and directory structure as this repository. Use the following steps to get started with your new repository.

Choose between the Docker or non-Docker setup. The Docker setup is recommended for a consistent development environment.

### Prerequisites

- [Node.js](https://nodejs.org/en/download) v18.0.0 or higher
- [Make](https://www.gnu.org/software/make/) installed on your system.
- [Git](https://git-scm.com/) installed on your system.
- [jq](https://stedolan.github.io/jq/) installed on your system.

## Setup without Docker

1. Issue the command `make init`

2. Issue `make versions` to generate all the versioned content.

3. Issue `make start` to start the development server.

4. Issue `make build` to build the site so that you can become familiar with the build process. If you want to preview the build, issue the command `npm run serve`.

## Setup with Docker

1. Issue the command `make build-docker` to build the Docker image.
2. Issue the command `make run-docker` to start the development server and access a shell in the container.
3. From inside the container shell, issue `make versions` to generate all the versioned content.

4. Next, issue the command `make start` to start the development server.

5. the command `make build` to build the site so that you can become familiar with the build process. If you want to preview the build, issue the command `npm run serve`.

To exit the container, issue the command `exit` or press `Ctrl + C`.

> [!TIP]
> Issue the command `make clean-versions` to remove all the versioned content.

## Create a New Version

## Frequently Asked Questions (FAQ)
