import { useState } from "react";
import PikachuLoader from "../../PikachuLoader/PikachuLoader";

interface IProps {
  children: (setLoading: any) => JSX.Element;
}

const LoadingWrapper = ({ children }: IProps) => {
  const [loading, setLoading] = useState(false);

  const renderLoader = () => (loading ? <PikachuLoader /> : null);

  const renderChild = () => children(setLoading);

  return (
    <>
      {renderChild()}
      {renderLoader()}
    </>
  );
};

const withLoading = (renderChild: any) => (
  <LoadingWrapper>{(setLoading: any) => renderChild({ setLoading })}</LoadingWrapper>
);

export default withLoading;
