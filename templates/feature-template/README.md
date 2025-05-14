# Feature Module

This is a template for creating new features in the sports betting platform.

## Directory Structure

\`\`\`
/feature-name/
  /components/          # UI components
  /hooks/               # Custom hooks
  /types/               # TypeScript types
  /utils/               # Feature-specific utilities
  /services/            # API services and data fetching
  /context/             # Context providers
  /state/               # State management
  index.ts              # Public API exports
  README.md             # Documentation for the feature
\`\`\`

## Usage

1. Copy this template directory to create a new feature
2. Rename all instances of "Feature" to your feature name
3. Update the types to match your feature's data model
4. Implement the API services in the `services` directory
5. Customize the components to match your feature's UI requirements

## State Management

This template uses the React Context API with useReducer for state management. The state is defined in the `types` directory, and the reducer is defined in the `state` directory.

## API Services

The API services are defined in the `services` directory. These functions handle all data fetching and manipulation with the backend.

## Components

The components are defined in the `components` directory. These components are responsible for rendering the UI and handling user interactions.

## Hooks

The hooks are defined in the `hooks` directory. These hooks provide access to the feature state and actions.

## Context

The context is defined in the `context` directory. It provides state and actions to all components in the feature.

## Utils

The utils are defined in the `utils` directory. These functions provide utility functionality for the feature.
