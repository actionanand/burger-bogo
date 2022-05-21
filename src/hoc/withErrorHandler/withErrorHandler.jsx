import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';


const withErrorhandler = (WrappedComponent, axios) => {

  return class extends Component { // class - without class name as we're not using anywhere this class with name

    state = {
      error: null
    };

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });

      axios.interceptors.response.use(resp => resp, error => {
        this.setState({error});
      });
    }

    errorConfirmationHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmationHandler}>
            Something didn't work! <br />
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }

  // return (props) => { // anonymous function
  //   return (
  //     <Aux>
  //       <Modal show>
  //         Something didn't work!
  //       </Modal>
  //       <WrappedComponent {...props} />
  //     </Aux>
  //   );
  // }
};

export default withErrorhandler;