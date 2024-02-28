# Snackbar Component

The Snackbar component provides a simple way to display brief and temporary messages, such as success or error notifications.

## Usage

1- Import the SnackBarProvider into your application:
```bash
import { SnackBarProvider } from 'your-snackbar-package';

const App = () => {
  return (
    <SnackBarProvider>
      <YourApp />
    </SnackBarProvider>
  );
};

export default App;
```
2- Use the useSnackbar hook to show messages in your application:
```bash
import React from 'react';
import { useSnackbar } from 'your-snackbar-package';

const MyComponent = () => {
  const { showSnackbar } = useSnackbar();

  const handleSuccess = () => {
    showSnackbar('Operation completed successfully', 'success');
  };

  const handleError = () => {
    showSnackbar('An error occurred', 'error');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success Snackbar</button>
      <button onClick={handleError}>Show Error Snackbar</button>
    </div>
  );
};

export default MyComponent;
```

## Props
The Snackbar component supports the following props:

- message: (string) The message to be displayed in the Snackbar.
- type: (string) The type of Snackbar, can be 'success' for a success message or 'error' for an error message.
