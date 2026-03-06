# Contributing

## Versioning

This project follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`).

- **Patch releases** (`0.x.1`, `0.x.2`, ...): Bug fixes, data updates, minor improvements. No git tag or GitHub release required.
- **Minor releases** (`0.1.0`, `0.2.0`, ...): New features or notable changes. Requires a git tag and GitHub release.
- **Major releases** (`1.0.0`, ...): Breaking changes to the public API.

## Release Process

### Patch Release
1. Make changes and commit with a descriptive message (e.g. `fix: ...`, `chore: ...`)
2. Bump the version in `package.json`
3. Commit the version bump: `chore: v0.x.y`
4. Publish to npm: `npm run deploy`

### Minor Release
1. Make changes and commit
2. Bump the minor version in `package.json` (reset patch to `0`)
3. Commit the version bump: `chore: v0.x.0`
4. Create a git tag: `git tag 0.x.0 && git push origin 0.x.0`
5. Publish to npm: `npm run deploy`
6. Create a GitHub release for the new tag with release notes

### Major Release
Same as a minor release, but also document all breaking API changes in the release notes.
