import React from "react";
import { Divider } from "semantic-ui-react";

export default function AppFooter() {
  return (
    <div className="text-center footer">
      <Divider />© {new Date().getFullYear()} - Keycloak POC
    </div>
  );
}
