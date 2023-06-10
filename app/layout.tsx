import "@styles/globals.css";
import { FC } from "react";
import Nav from "../components/navBar";
import Provider from "@components/Provider";

export const metadata = {
  title: "Red page",
  description: "Discover & Share AI Prompts",
};

const RootLayout: FC<any> = ({ children }) => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleMapsApiKey}&callback=initMap`}
        />
      </body>
    </html>
  );
};

export default RootLayout;
