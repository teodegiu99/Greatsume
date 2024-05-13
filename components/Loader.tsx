import { hatch } from "ldrs";

import React from "react";

function Loader() {
  hatch.register();
  return (
    <div>
      <l-hatch size="28" stroke="4" speed="3.5" color="black"></l-hatch>
    </div>
  );
}

export default Loader;
