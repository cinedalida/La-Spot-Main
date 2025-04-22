import "../css/Header2.css";
import "../css/Footer.css";
import "../css/ScrollUp.css";
import "../css/UserParking.css";
import "../css/UserProfile.css";

import { Header2 } from "../components/Header2";
import { Footer } from "../components/Footer";
import { ScrollUp } from "../components/ScrollUp";
import UserParking from "../components/UserParking";
import { UserProfile } from "../components/UserProfile";

export function UserPage() {
  return (
    <>
      {/* waitings kay jan to be re-edited by cine */}
      <Header2 />
      <UserParking />
      <UserProfile />
      <Footer />

      <ScrollUp />
    </>
  );
}
