import React from "react";
import PublicLayoutProps from "../../../interface/layouts/publicLayoutsProps";

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="public-layout">
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
