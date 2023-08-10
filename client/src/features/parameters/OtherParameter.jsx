import ParameterMain from "./UI/ParameterMain";
import PageConnectionWait from "../../components/page/PageConnectionWait";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useGetParametersQuery } from "../../store/api/parameterApi";

const OtherParameter = () => {
  const { data: parameters, isLoading, isFetching } = useGetParametersQuery();

  const { parameterType } = useSelector((state) => state.general);

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!parameters)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const filteredData = parameters.filter(
    (item) => item.variant === parameterType
  );

  return (
    <Box>
      {filteredData.map((item) => (
        <ParameterMain
          key={item.id}
          title1={`${item.variant} Ekle`}
          title2={`${item.variant} Listesi`}
          formName={item.variant}
          tableWidth={400}
          data={item}
        />
      ))}
    </Box>
  );
};

export default OtherParameter;
