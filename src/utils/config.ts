const config = {
  apiUrl:
    (import.meta.env.VITE_API_URL as string) || 'http://localhost:8080/api',
  organizationName:
    (import.meta.env.VITE_ORGANIZATION_NAME as string) || 'SIRIUS',
  cognitoClientId: import.meta.env.VITE_COGNITO_CLIENT_ID as string,
  cognitoUrl: import.meta.env.VITE_COGNITO_URL as string,
  cognitoRedirectUrl: import.meta.env.VITE_COGNITO_REDIRECT_URL as string
}

export default config
