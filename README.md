[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

# Docusarus Versioning with Git - Template

This is a template for a Docusarus site that uses Git for versioning. We recommend you read the blog post [_When Docs and a Dinosaur Git Along_]() to understand the motivation behind this template and why we at Spectro Cloud chose to use Git for versioning.

<p align="center">
  <img src="./static/img/readme-image.png" alt="Docusarus + heart with Spectro Cloud Astronaut + git" width="400"/>
</p>

> [!IMPORTANT]
> This repository will not be actively maintained and was created for demonstration purposes only. We recommend you use this repository as a starting point to help you spark ideas on implementing versioning in your Docusarus site.

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

5. Use the command `make build` to build the site so that you can become familiar with the build process. If you want to preview the build, issue the `npm run serve` command.

To exit the container, issue the command `exit` or press `Ctrl + C`.

> [!TIP]
> Issue the command `make clean-versions` to remove all the versioned content.

## Create a New Version

To create a new version, use the git command `git checkout -b <name-of-branch>`. This will create a new branch and switch to it. Once you are inside the new version branch, start making changes and commit them.

We recommend you settle on a naming pattern for your version branches. This example repository uses the pattern `version-<version-number>`. For example, `version-1-1`. If you go with a different pattern, update the [versions.sh](./scripts/versions.sh) script to reflect the new pattern.

## Frequently Asked Questions (FAQ)

### ❓ How do I preview all versioned content locally?

_Use the command `make versions` to generate all the versioned content. Then, use the `make start` command to start the development server. You can also preview the build using the command `make build` and then issue the command `npm run serve`._

### ❓ How do I remove all versioned content?

\_Use the command `make clean-versions` to remove all the versioned content. This command removes the `versioned_docs` and `versioned_sidebars directories`. It also removes the `versions.json` file, changes to the `docusaurus.config.js` file, and the `static/robots.txt` file.

### ❓ How do you backport changes to older versions?

You have a couple of options to backport changes to older versions.

1. Create a new branch from the default branch, make the changes, commit, and create a pull request. Add the label `auto-backport`, and select the labels that match the versions to which you want to backport the changes. The [backport.yml](./.github/workflows/backport.yml) workflow will automatically create a backport PR for each version. Merge the PRs to backport the changes.

2. You can use the `git cherry-pick` command to pick a commit from a newer version and apply it to an older version. This approach is more common when the backport workflow cannot create a backport PR due to merge conflicts.

3. If the change applies only to a specific version, you can make it directly in the version branch and commit it. Ideally, you do this through a pull request so that the change is reviewed.

### ❓ A backport PR failed to get created. What do I do?

_The backport PR failed to get created because of a merge conflict. The simplest approach is to switch to the version branch and do a `git cherry-pick` of the commit that introduced the change. For example, if the merged PR created commit `1dee9d31fcf651ac5c0428254fd38b4783b94b53`, you would issue `git cherry-pick 1dee9d31fcf651ac5c0428254fd38b4783b94b53` and resolve any conflicts, ideally from an editor. Addresses the issues, commits the changes, and pushes them up. We prefer to create a new branch when doing cherry-picks versus doing it from the version branch. We then merge the PR into the version branch to ensure we are not introducing any changes that could break the build._

### ❓ I started the local development server, but I don't see the versioned content. What's wrong?

_You need to generate the versioned content first. Use the command `make versions` to generate all the versioned content. Then, use the command `make start` to start the development server._

### ❓ I tried to generate the versioned content, but I got an error. What's wrong?

Ensure there are no uncommitted changes in your current branch. The [versions.sh](./scripts/versions.sh) script will check out each version branch and generate the versioned content for that respective branch. If there are uncommitted changes, the script will fail due to get errors.

### ❓ How come this is not for Docusaurs with TypeScript?

There are no reasons; it's just not the configuration we use for Docusarus at Spectro Cloud. But there are no reasons why you can't use TypeScript with this template. However, you will need to change the configuration files to use TypeScript.

### ❓ I have multiple plugins in my Docusaurus site. How do I handle this?

Multiple plugins can be added to this solution. The most important thing is to ensure the `versions.sh` and the `update_docusarus_config.js` are updated to target these plugins. For example, if you have a plugin called `api`, then in the `versions.sh` you would add an entry to create the versioned content for the `api` plugin.

```shelll
# Run the npm command
echo "Running: npm run docusaurus docs:version $extracted_versionX"
npm run docusaurus docs:version $extracted_versionX

# Generate the API docs
echo "Running: npm run generate-api-docs"
npm run generate-api-docs
```

You would have to make sure that the required temporary folders and files are created as well in the `versions.sh` script. Check out our production [`versions.sh`](https://github.com/spectrocloud/librarium/blob/master/scripts/versions.sh) script for an example of how we handle multiple plugins.

The `update_docusarus_config.js` script must also be updated to handle the multiple plugins. For example, if you have a plugin called `api`, then you would need to add an entry to the `update_docusarus_config.js` script to update the `api` plugin. Check out our production [`update_docusarus_config.js`](https://github.com/spectrocloud/librarium/blob/master/scripts/update_docusarus_config.js) script. In our production script, we have a function for each plugin that we want to update.

```js
const apiDocsVersionsObject = findApiDocsPluginVersionsObject();
if (apiDocsVersionsObject) {
  updateVersionsObject(apiDocsVersionsObject);
}
```

The `findApiDocsPluginVersionsObject` locates the `api` plugin object in the `docusaurus.config.js` file. The `updateVersionsObject` function updates the `api` plugin object with the versioned content. We use the `versionsOverride.json` file to override the `label`, `version`, and `banner` properties.

For example, in our Spectro Cloud production's site `version-3-4` branch we change the `label` to display `v3.4.x and prior`. This is the value we use in the `versionsOverride.json` file to override default behavior.

```json
[
  {
    "version": "3.4.x",
    "banner": "none",
    "label": "v3.4.x and prior"
  }
]
```
