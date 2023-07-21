import ModalButton from "./ModalButton";
import TableSearchInput from "./table/TableSearchInput";
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
        direction={{ md: "row" }}
        justifyContent="space-between"
        alignItems={{ md: "center" }}
        spacing={{ xs: 2, md: 0 }}
        sx={{ p: 2, pl: 3 }}
      >
        <Stack direction="row" spacing={2} alignItems={"center"}>
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
        <TableSearchInput />
      </Stack>
    </Paper>
  );
};

export default PageFormContainer;
