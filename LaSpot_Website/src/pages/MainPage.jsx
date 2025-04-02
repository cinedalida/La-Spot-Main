import "../css/LandingHome.css";
import "../css/LandingParking.css";
import "../css/LandingProcedure.css";

import { LandingHome } from "../components/LandingHome";
import { LandingProcedure } from "../components/LandingProcedure";
import LandingParking from "../components/LandingParking";

export function MainPage() {
  return (
    <>
      <LandingHome />
      <LandingProcedure />
      <LandingParking />
    </>
  );
}
