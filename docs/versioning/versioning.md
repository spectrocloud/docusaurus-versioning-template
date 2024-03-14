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

The offical Docusarus documentation [recommends keeping the number of active versions to a minimum](https://docusaurus.io/docs/versioning#keep-the-number-of-versions-small), to less than 10. The larger the documentation base, the more active versions you have will impact your builds and the performance of your site. At Spectro Cloud, we have a maximum of 3 active versions at any given time. As we release new versions, we move older versions to an external domain, which is still accessible but not part of the main documentation site.

:::info

If your documentation base is large, experiment and identify your ceiling for the number of active versions. For example, we learned that anything more than three active versions causes our builds to fail due to memory issues.

:::

![Image of Palette documentation docs version dropdown menu item](/img/version-dropdown.png)

To achieve this behavior, add previopus versioning entries after your active versions by using the `dropdownItemsAfter` when configuring the `docsVersionDropdown`. This is configured in the `docusaurus.config.js` file

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

For a real world example, check out the Palette documenation's [archiveVersions file](https://github.com/spectrocloud/librarium/blob/master/archiveVersions.json).

## Backporting Changes

This template leverages the [Backport Tool](https://github.com/sorenlouv/backport) to backport changes to older versions of the documentation. We prefer to use the [CI action](https://github.com/marketplace/actions/backport-action) to control this flow. In this template, the backport action is configured in the [`.github/workflows/backport.yml`](https://github.com/spectrocloud/docusarus-versioning-template/blob/main/.github/workflows/backport.yaml) file.

If a pull request targeting the `main` branch contains changes that need to be backported, add the `backport` label to the pull request. The backport action will then create a pull request targeting the older versions of the documentation. The backport action will also add a comment to the original pull request with the URL of the backport pull request. We made a decision to name all our version branches `version-x-x` and as a result, the backport action is configured to target branches that match this pattern. We created a label that starts with the prefix `backport-` followed by the version branch name. For example, `backport-version-1-0`, `backport-version-2-0`, and so on. The backport action is configured to target branches that match this pattern.

![View of a pull request with labels](/img/backport-labels.png)
