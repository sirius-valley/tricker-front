# Snackbar Component

The Snackbar component provides a simple way to display brief and temporary messages, such as success or error notifications.

## Usage

1- Import the SnackBarProvider into your application:
```javascript
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
```javascript
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider';

const MyComponent = () => {
  const { showSnackBar } = useSnackBar();

  const handleSuccess = () => {
    showSnackBar('Operation completed successfully', 'success');
  };

  const handleError = () => {
    showSnackBar('An error occurred', 'error');
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
