import { useUserSettings } from '../hooks/useUserSettings';
import { LoadingPage } from '../errors/LoadingPage';

export function SettingsPage() {
  const { isLoading, settings } = useUserSettings(
    JSON.parse(window.localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)) ||
      ''
  );

  if (isLoading) {
    return <LoadingPage />;
  }
  return <>{settings}</>;
}
