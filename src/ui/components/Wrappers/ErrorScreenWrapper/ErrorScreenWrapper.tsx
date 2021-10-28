import { useState } from "react";
import { ErrorScreen } from "../../../ErrorScreen/ErrorScreen";

type RenderFunctionParamsType = { setError: SetErrorFunctionType; error: ErrorType | null };
type RenderFunctionType = (params: RenderFunctionParamsType) => JSX.Element | null;

interface IErrorScreenWrapperProps {
  children: RenderFunctionType;
  type?: ErrorType | null;
}

export const ErrorScreenWrapper = ({ children, type = null }: IErrorScreenWrapperProps) => {
  const [error, setError] = useState<ErrorType | null>(type);

  const renderLoader = () => (error ? <ErrorScreen type={error} /> : null);

  const renderChild = () => children({ setError, error });

  return (
    <>
      {renderChild()}
      {renderLoader()}
    </>
  );
};

const withError = (renderChild: RenderFunctionType) => (
  <ErrorScreenWrapper>
    {({ setError, error }: RenderFunctionParamsType) => renderChild({ setError, error })}
  </ErrorScreenWrapper>
);

export default withError;
