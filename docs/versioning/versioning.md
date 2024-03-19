---
sidebar_label: "Tips & Tricks"
title: "Tips & Tricks"
description: "Tips & Tricks with versioning."
hide_table_of_contents: false
# toc_min_heading_level: 2
# toc_max_heading_level: 2
sidebar_position: 10
---

## Number of Active Versions

The official Docusarus documentation [recommends keeping the number of active versions to a minimum](https://docusaurus.io/docs/versioning#keep-the-number-of-versions-small) to less than 10. The larger the documentation base, the more active versions you have will impact your builds and your site's performance. We at Spectro Cloud have a maximum of three active versions at any given time. As we release new versions, we move older versions to an external domain, which is still accessible but not part of the main documentation site domain.

:::info

If your documentation base is large, experiment and identify your ceiling for the number of active versions. For example, we learned that anything more than three active versions causes our builds to fail due to memory issues.

:::

![Image of Palette documentation docs version dropdown menu item](/img/version-dropdown.png)

Add previous versioning entries after your active versions using the `dropdownItemsAfter` when configuring the `docsVersionDropdown` to achieve this behavior. This is configured in the `docusaurus.config.js` file

    ```js
    {
                type: "docsVersionDropdown",
                position: "left",
                docsPluginId: "default",
                dropdownItemsAfter: [
                  ...Object.entries(ArchivedVersions).map(
                    ([versionName, versionUrl]) => ({
                      href: versionUrl,
                      label: versionName,
                    })
                  ),
                ],
              },
    ```

In this template, the file `archiveVersions.json` contains the archived versions and their URLs. To move a version to the archive, add the version and the URL to the file. The file looks like the following.

```js
{
  "v1.0.x": "https://v1.docusaurus.io/"
}
```

For a real-world example, check out the Palette documentation [archiveVersions file](https://github.com/spectrocloud/librarium/blob/master/archiveVersions.json).

## Backporting Changes

This template leverages the [Backport Tool](https://github.com/sorenlouv/backport) to backport changes to older versions of the documentation. We prefer to use the [CI action](https://github.com/marketplace/actions/backport-action) to control this flow. In this template, the backport action is configured in the [`.github/workflows/backport.yml`](https://github.com/spectrocloud/docusarus-versioning-template/blob/main/.github/workflows/backport.yaml) file.

If a pull request targeting the `main` branch contains changes that need to be backported, add the `backport` label to the pull request. The backport action will then create a pull request targeting the older versions of the documentation. The backport action will also add a comment to the original pull request with the URL of the backport pull request. We decided to name all our version branches `version-x-x`; as a result, the backport action is configured to target branches that match this pattern. We created a label that starts with the prefix `backport-` followed by the version branch name. For example, `backport-version-1-0`, `backport-version-2-0`, and so on. The backport action is configured to target branches that match this pattern.

![View of a pull request with labels](/img/backport-labels.png)

A pull request for each version branch you targeted through the usage of labels will be created. The pull request will contain the changes that need to be backported.

![View of a pull requests created by Backport CI action](/img/backport-prs.png)

The backport action will also add a comment to the original pull request with the URL of the backport pull request.

![A view of the comment Backport adds to the original PR](/img/pr-comments.png)

## Adopting a Git Versioning Strategy

In our experience, adopting this approach has been a relatively smooth experience. If your team is familiar with git and using [Docs as Code](https://www.writethedocs.org/guide/docs-as-code/), this approach will be a natural fit. This approach may be challenging for documentation teams unfamiliar with git and using Docs as Code. We recommend starting with a small documentation base, such as this template, and experimenting with this approach. Once you are comfortable, you can scale it to your entire documentation base.

The following checklist will help you adopt this approach.

- [ ] Identify the naming pattern for your version branches. We use the pattern `version-<version-number>`. For example, `version-1-1`. If you go with a different pattern, update the [versions.sh](https://github.com/spectrocloud/docusarus-versioning-template/blob/main/scripts/versions.sh) script to reflect the new pattern.

- [ ] Create the label `auto-backport` in your repository. This label triggers the backport action. If you choose a different label name, update the [backport.yml](https://github.com/spectrocloud/docusarus-versioning-template/blob/main/.github/workflows/backport.yaml) workflow to reflect the new label name.

- [ ] Create the backport labels for each version branch. We use the pattern `backport-version-<version-number>`. For example, `backport-version-1-1`. If you go with a different pattern, update the [backport.yml](https://github.com/spectrocloud/docusarus-versioning-template/blob/main/.github/workflows/backport.yaml) workflow to reflect the new pattern.

  :::info

  Backport automatically looks for labels with the prefix `backport-` followed by the version branch name. For example, `backport-version-1-0`, `backport-version-2-0`, and so on. The backport action is configured to target branches that match this pattern.

  :::

- [ ] Create the version branches. Use the git command `git checkout -b <name-of-branch>`. This will create a new branch and switch to it. Once you are inside the new version branch, start making changes and commit them.

- [ ] Review the `scripts/versions.sh` script and update it to handle your version branches. This script is used to generate the versioned content for each version branch.

- [ ] Review the `scripts/update_docusarus_config.js` script and update it to handle your plugins. This script updates the `docusaurus.config.js` file to handle your version branches. The script in this template is configured to handle the `docs` plugin. If you have multiple plugins, you must update this script to handle them. Check out our production [`update_docusarus_config.js`](https://github.com/spectrocloud/librarium/blob/master/scripts/update_docusarus_config.js) script for an example of how we handle multiple plugins.

- [ ] Review the `scripts/generate_robots.sh` script and verify you are comfortable with the robots.txt file it generates. This script is used to generate the `robots.txt` that resides in the `static` directory. The `robots.txt` file is used to control the behavior of web crawlers. The `robots.txt` file this script generates is configured to disallow web crawlers from indexing the version branches. If you are comfortable with the `robots.txt` file, use the script as is. If you are uncomfortable with the `robots.txt` file, update the script to generate a `robots.txt` configuration you prefer.

- [ ] Review how to use the [`git cherry-pick`](https://git-scm.com/docs/git-cherry-pick) command. You will encounter situations where you will have a merge conflict when backporting changes to older versions of the documentation. You will need to resolve these merge conflicts using `git cherry-pick`.

- [ ] Review the [Frequently Asked Questions (FAQ)](https://github.com/spectrocloud/docusarus-versioning-template) for more information.
