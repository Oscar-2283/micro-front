import React from "react";
const Button = React.lazy(() => import("MicroFrontend/Button"));
const Button2 = React.lazy(() => import("MicroFrontend/Button2"));

export default function App() {
  return (
    <div>
      <h1>Container</h1>
        <Button buttonName={'click here'} />
        <Button2 buttonName={'two'} />

    </div>
  );
}