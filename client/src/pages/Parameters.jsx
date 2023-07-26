import OtherParameter from "../components/parameters/OtherParameter";
import NewParameter from "../components/parameters/NewParameter";
import PageConnectionWait from "../components/UI/PageConnectionWait";
import AddIcon from "@mui/icons-material/Add";
import { PageWrapper } from "../layouts/Wrappers";
import { useGetParametersQuery } from "../redux/apis/parameterApi";
import { setParameterType } from "../redux/slices/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

const Parameters = () => {
  const { data: parameters, isLoading, isFetching } = useGetParametersQuery();
  const { parameterType } = useSelector((state) => state.general);
  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!parameters)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  return (
    <PageWrapper conSx={{ mt: 4, p: 3 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ sm: "center" }}
        spacing={4}
        sx={{ mb: 3 }}
      >
        <Typography variant="h6">Parametreler</Typography>
        <ToggleButtonGroup
          value={parameterType}
          exclusive
          onChange={(e) => dispatch(setParameterType(e.target.value))}
          aria-label="Platform"
        >
          {parameters.map((item, index) => (
            <ToggleButton
              key={index}
              color="secondary"
              value={item.variant}
              sx={{ minWidth: "12ch", p: 0.8 }}
              size="small"
            >
              {item.variant}
            </ToggleButton>
          ))}

          <ToggleButton
            color="secondary"
            value="newParam"
            sx={{ minWidth: "12ch", p: 0.8 }}
            size="small"
          >
            <AddIcon fontSize="small" />
            Yeni
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {parameterType === "newParam" ? <NewParameter /> : <OtherParameter />}
    </PageWrapper>
  );
};

export default Parameters;
