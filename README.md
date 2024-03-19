[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

# Docusarus Versioning with Git - Template

This is a template for a Docusarus site that uses Git for versioning. We recommend you read the blog post [_When Docs and a Dinosaur Git Along_]() to understand the motivation behind this template and why we, at Spectro Cloud, chose to use Git for versioning.

<p align="center">
  <img src="./static/img/readme-image.png" alt="Docusarus + heart with Spectro Cloud Astronaut + git" width="400"/>
</p>

> [!IMPORTANT]
> This repository will not be actively maintained and was created for demonstration purposes only. We recommend you use this repository as a starting point and customize it to fit your needs.

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

To create a new version, use the git command `git checkout -b <name-of-branch>`. This will create a new branch and switch to it. At this point, once you are inside the new version branch, start making changes and commit them.

We recommend you settle on a naming pattern for your version branches. This example repository uses the pattern `version-<version-number>`. For example, `version-1-1`. If you go with a different pattern, make sure to update the [versions.sh](./scripts/versions.sh) script to reflect the new pattern.

## Frequently Asked Questions (FAQ)

### ❓ How do I preview all versioned content locally?

_Use the command `make versions` to generate all the versioned content. Then, use the command `make start` to start the development server. You can also preview the build using the command `make build` and then issue the command `npm run serve`._

### ❓ How do I remove all versioned content?

_Use the command `make clean-versions` to remove all the versioned content._ This command removes the `versioned_docs` and `versioned_sidebars` directories. The command also removes the `versions.json` file, changes to the `docusaurus.config.js` file, and the the `static/robots.txt` file.

### ❓ How do you backport changes to older versions?

You have a couple of options to backport changes to older versions.

1. Create a new branch from the default banch, make the changes, commit and create a pull request. Add the label `auto-backport`, and select the labels that match the versions you want to backport the changes to. The [backport.yml](./.github/workflows/backport.yml) workflow will automatically backport the changes to the selected versions.

2. You can use the `git cherry-pick` command to pick a commit from a newer version and apply it to an older version. This approach is more common when the backport worflow is unable to create a backport PR due to merge conflicts.

3. If the change is only applicable to a specific version, you can make the change directly in the version branch and commit the change. Ideally, you do this through a pull request so that the change is reviewed.

### ❓ I started the local development server, but I don't see the versioned content. What's wrong?

_You need to generate the versioned content first. Use the command `make versions` to generate all the versioned content. Then, use the command `make start` to start the development server._

### ❓ I tried to generate the versioned content, but I got an error. What's wrong?

Ensure there are no uncomitted changes in your current branch. The [](./scripts/versions.sh) script will checkout each version branch and generate the versioned content for that respective branch. If there are uncomitted changes, the script will fail due to git errors.

### ❓ How come this is not for Docusaurs with TypeScript?

No reasons, it's just not the confiruation we use for Docusarus at Spectro Cloud. But, there is no reasons why you can't use TypeScript with this template. However, you will need to make some changes to the configuration files to use TypeScript.
