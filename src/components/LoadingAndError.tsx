import { LoadingErrorProps } from '../types/interfaces';

const LoadingAndError = ({ isLoading, error }: LoadingErrorProps) => {
  if (isLoading) {
    return <h1 className="loading">Loading...</h1>;
  }

  if (error) {
    return <h4 className="error">Error: {error}</h4>;
  }

  return null;
};

export default LoadingAndError;
