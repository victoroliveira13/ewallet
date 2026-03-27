# E-Wallet App

React Native mobile app built with Expo + NativeWind + react-router-native.

## Setup

```bash
npm install
npx expo start
```

## Tech Stack
- Expo ~54 (managed workflow)
- React 19 + React Native 0.81
- React Router Native 6 (navigation)
- NativeWind v4 (Tailwind CSS for RN)
- TypeScript

## Screens
- Home: balance overview, quick actions, recent transactions
- Send: contact selection + numpad amount entry
- Receive: QR code + wallet address
- History: full transaction list with filters
- Profile: user info + settings menu
- Notifications: notification center

---

## Branch Strategy

| Branch      | Purpose                          | Merges to  |
|-------------|----------------------------------|------------|
| `master`    | Production — stable releases     | —          |
| `beta`      | Pre-release / QA                 | `master`   |
| `develop`   | Active development               | `beta`     |
| `feature/*` | Individual features              | `develop`  |
| `fix/*`     | Bug fixes                        | `develop`  |
| `hotfix/*`  | Urgent production fixes          | `master`   |

**Flow:** `feature/* → develop → beta → master`

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

```
feat(screen): add monthly balance chart
fix(send): fix minimum amount validation
chore(deps): update expo to 54.1.0
```

| Type       | Version Bump |
|------------|--------------|
| `feat`     | minor        |
| `fix`      | patch        |
| `BREAKING CHANGE` | major |
| `chore`, `docs`, `refactor` | none |

## CI/CD

- **CI** (`ci.yml`) — TypeScript type-check on every push/PR to `develop`, `beta`, `master`
- **Beta** (`beta.yml`) — Creates a GitHub pre-release on merge to `beta`
- **Release** (`release.yml`) — Auto-bumps version, creates tag + GitHub Release on merge to `master`
