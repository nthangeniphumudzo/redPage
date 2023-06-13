import "@styles/globals.css";
import { FC } from "react";
import QueryProvider from "@components/QueryProvider";

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
          <QueryProvider>{children}</QueryProvider>
        </main>
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleMapsApiKey}&callback=initMap`}
          defer
        />
      </body>
    </html>
  );
};

export default RootLayout;
