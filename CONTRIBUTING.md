# Contributing to OdysseyDaily

Thank you for your interest in contributing to OdysseyDaily! This guide will help you get started.

## Getting Started

1. **Fork the repository** and clone your fork locally
2. **Install dependencies**: `npm install`
3. **Set up environment variables**: Copy `.env.example` to `.env.local` and fill in your credentials
4. **Start development server**: `npm run dev`
5. **Access the app**: Open http://localhost:9002

## Development Workflow

### Running the Project
- `npm run dev` - Start Next.js development server on port 9002
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit with hot reload
- `npm run build` - Build for production
- `npm run typecheck` - Check TypeScript types

### Code Quality
- Follow TypeScript strict mode guidelines
- Use meaningful variable and function names
- Write comments for complex logic
- Keep components small and focused

### Commit Messages
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

**Examples:**
- `feat: add XP reward system for completed quests`
- `fix: resolve Pomodoro timer pause issue`
- `docs: update Firebase setup instructions`

## Pull Request Process

1. Create a new branch: `git checkout -b feat/your-feature-name`
2. Make your changes and commit using conventional commits
3. Push to your fork: `git push origin feat/your-feature-name`
4. Open a Pull Request with a clear description of changes
5. Wait for review and address any feedback

## Questions?

Feel free to open an issue for questions or discussions!