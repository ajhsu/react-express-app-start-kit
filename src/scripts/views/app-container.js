import React from 'react';
import { connect } from 'react-redux'

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>
          Hello<br/>
          react-redux-babel-gulp-postcss-node-express-server-tape-istanbul-boilerplate<br/>
          world!
        </h1>
        <h3>
          {this.props.count}
        </h3>
      </div>
    );
  }

  componentDidMount() {
    console.log(`this.props:`, this.props);

    // Sample action
    this.props.add();
  }
};

const ACTION_ADD = {
  type: 'ADD'
};
const actionCreator = {
  add: () => {
    return ACTION_ADD;
  }
};

const mapDispatchToProps = actionCreator;
const mapStateToProps = (state) => {
  return state;
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
export default ConnectedApp;