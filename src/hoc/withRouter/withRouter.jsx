import { useLocation, useNavigate } from 'react-router-dom';

const withRouter = (WrappedComponent) => {
  const WrapperFn = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
      <WrappedComponent
        navigate={navigate}
        location={location}
        {...props} />
    );
  };
  
  return WrapperFn;
};

export default withRouter;