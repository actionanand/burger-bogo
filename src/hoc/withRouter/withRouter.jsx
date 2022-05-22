import { useNavigate } from 'react-router-dom';

const withRouter = (WrappedComponent) => {
  const WrapperFn = (props) => {
    const navigate = useNavigate();
    
    return (
      <WrappedComponent
        navigate={navigate}
        {...props} />
    );
  };
  
  return WrapperFn;
};

export default withRouter;