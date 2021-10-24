import { RouteProps, useParams } from "react-router-dom";

interface Params {
  id: string;
}

const Details = (props: RouteProps) => {
  const { id } = useParams<Params>();
  return <div>DETAILS FROM {id}</div>;
};

export default Details;
