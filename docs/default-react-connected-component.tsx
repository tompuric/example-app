import * as React from 'react';
import styled from 'styled-components';
import { connect, MapDispatchToPropsParam } from 'react-redux';

import { IState } from '***/state/store/defaultStore';

type Props = OwnProps & IStateProps & IDispatchProps;

type OwnProps = {
};

type State = {
};

export class ConnectedComponent extends React.Component<Props, State> {
  render() {
    return (
      <div>
        test
      </div>
    );
  }
}

const mapStateToProps = (state: IState): IStateProps => {
  const {} = state;
  return {
  };
};

interface IStateProps {
}

const mapDispatchToProps: MapDispatchToPropsParam<IDispatchProps, OwnProps> = {
};

interface IDispatchProps {
}

export default connect<IStateProps, IDispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedComponent);
