import ModalButton from "./ModalButton";
import { Paper, Stack, Typography } from "@mui/material";

const PageFormContainer = ({
  children,
  title,
  modalOpen,
  setModalOpen,
  modalHeight,
}) => {
  return (
    <Paper>
      <Stack
        direction="row"
        spacing={2}
        alignItems={"center"}
        sx={{ p: 2, pl: 3 }}
      >
        <Typography color={"secondary"}>{title}</Typography>
        <ModalButton
          title={title}
          height={{ md: { modalHeight } }}
          width="150%"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          size="normal"
        >
          {children}
        </ModalButton>
      </Stack>
    </Paper>
  );
};

export default PageFormContainer;
