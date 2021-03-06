## Contributing to Mapnik Reference

We welcome contributions. Please provide pull requests and notify @springmeyer for review.

### Releasing

1) Create a milestone for the upcoming release

 - Assign tickets to it
 - Notify other contributors
 - Discuss, if needed, what the version # should be based on the types of changes anticipated

2) If the version in `package.json` is not already updated for the new release:

- Update the version
- Do a bump commit

```bash
git commit -a -m "bump to v0.8.1"
```

Only bump the version when committing to master (not in pull requests).

3) Make sure all tests are passing on travis: [![Build Status](https://travis-ci.org/mapnik/mapnik-reference.svg?branch=master)](https://travis-ci.org/mapnik/mapnik-reference)

4) Ensure the changelog lists the upcoming version and details of what changed

5) Tag the new version and upload to github

```bash
git tag -a v0.8.1 -m "tagging v0.8.1"
```

6) Publish to npm

NOTE: make sure your git checkout is clean first: `git status` should show no changes or untracked files.

```bash
npm publish
```

