import { AboutAppSection } from './AboutAppSection';
import { UserLandingPage } from './UserLandingPage';
import '../../static/css/landingStyle.css';

export function LandingPage({ isValid }) {
  return <>{isValid ? <UserLandingPage /> : <AboutAppSection />}</>;
}
