# React Material Pull To Refresh

A React component that provides pull-to-refresh functionality with Material Design animations, inspired by native mobile experiences.

## Features

- Smooth pull-to-refresh gesture handling
- Material Design spinner and arrow animations
- Customizable colors and thresholds
- Touch and mouse support
- Lightweight and performant

## Installation

```bash
npm install react-material-pull-to-refresh
```

## Usage

```jsx
import React from 'react';
import PullToRefresh from 'react-material-pull-to-refresh';

function App() {
  const handleRefresh = async () => {
    // Your refresh logic here
    await fetchNewData();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div>
        {/* Your content here */}
        <h1>Pull down to refresh</h1>
        <p>Content goes here...</p>
      </div>
    </PullToRefresh>
  );
}

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The content to wrap with pull-to-refresh |
| `onRefresh` | `() => Promise<void>` | `() => Promise.resolve()` | Function called when refresh is triggered |
| `threshold` | `number` | `80` | Distance in pixels to trigger refresh |
| `maxPull` | `number` | `180` | Maximum pull distance |
| `color` | `string` | `'#2563eb'` | Color of the spinner and arrow |
| `backgroundColor` | `string` | `'#ffffff'` | Background color of the indicator bubble |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Lint the code
npm run lint
```

## 📖 Documentation

Full documentation with examples and API reference is available at: [react-material-pull-to-refresh.pages.dev](https://react-material-pull-to-refresh.pages.dev)

The documentation includes:
- Interactive live demo
- Installation guide
- Usage examples
- Complete API reference
- Feature overview

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.
