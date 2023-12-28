import React from "react";
type CoreContentProps = {
  children: React.ReactElement;
};
const InnerContainer: React.FC<CoreContentProps> = ({ children }) => {
  return (
    <main className="flex-grow px-4 pb-16 md:px-10 md:pb-20">
      {children}
    </main>
  );
};
export default InnerContainer;
