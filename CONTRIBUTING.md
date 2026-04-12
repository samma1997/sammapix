# Contributing to SammaPix

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/samma1997/sammapix.git
cd sammapix
npm install
cp .env.local.example .env.local  # fill in your keys
npm run dev
```

## Guidelines

- **TypeScript strict** — no `any` types
- **Client-side first** — image processing must run in the browser whenever possible
- **Privacy** — never upload user images to a server unless absolutely necessary (e.g., AI features)
- **Accessibility** — all tools must be keyboard-navigable and screen-reader friendly

## Pull Requests

1. Fork the repo and create a feature branch from `develop`
2. Make your changes with clear commit messages
3. Ensure `npm run build` passes without errors
4. Open a PR against `develop` (not `main`)

## Reporting Issues

Open an issue with:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS version

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
