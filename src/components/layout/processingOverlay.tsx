import { Overlay, Pane, Spinner } from "evergreen-ui";
import React from "react";

import pallete from "../../config/pallete";

interface Iprops {
  status: boolean;
}

const ProcessingOverlay: React.FC<Iprops> = ({ status }: Iprops) => {
  return (
    <Overlay isShown={status} shouldCloseOnClick={false}>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Spinner size={50} color={pallete.white} zIndex="1" opacity="1" />
      </Pane>
    </Overlay>
  );
};

export default ProcessingOverlay;
