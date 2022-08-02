import { Dialog } from "@material-ui/core";
import React from "react";
import { Triangle } from "react-loader-spinner";
import { useModal } from "../contexts/ModalContext";

const LoaderModal = () => {
  const { loaderModal } = useModal();

  return (
    <Dialog
      open={loaderModal}
      className="loaderModal"
      style={{
        zIndex: "1400 !important",
      }}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
      BackdropProps={{
        style: {
          opacity: 1,
        },
      }}
    >
      <Triangle type="TailSpin" color="#00BFFF" height={100} width={100} />
    </Dialog>
  );
};

export default LoaderModal;
