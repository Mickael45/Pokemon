import { useParams } from "react-router-dom";
import Page from "../../templates/Page/Page";

interface Params {
  id: string;
}

const Details = () => {
  const { id } = useParams<Params>();

  return (
    <Page>
      <div>DETAILS FROM {id}</div>
    </Page>
  );
};

export default Details;
