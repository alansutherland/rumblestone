import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../components/Button";
import { setRegion } from "../actions/region";
const regionList = ['Japan', 'Taiwan', 'Hong Kong', 'South East Asia']

class Regions extends React.Component {

  regionSelected(region){
    const { dispatch } = this.props;
    if(this.props.region === "" || this.props.user === 'admin' || this.props.votingClosed){
      dispatch(setRegion(region));
    }
  }

  renderButtons(){
    return regionList.map( r => (
        <Button 
            key={r} 
            text={r}
            type="region"
            selected={this.props.region === r}
            onClick={() => this.regionSelected(r)} 
        />
    ))
  }

  render() {
    return (
      <RegionsWrapper disableRegions={this.props.disabled && this.props.user === 'user'} votingClosed={this.props.votingClosed}>
        {this.renderButtons()}
      </RegionsWrapper>
    );
  }
}

Regions.propTypes = {
  disabled: PropTypes.number,
  user: PropTypes.string,
  region: PropTypes.string,
  dispatch: PropTypes.func,
  votingClosed: PropTypes.bool,
};

function mapStateToProps(state) {
  const region = state.region.get("name");
  const user = state.user.get("name");
  const disabled = state.region.get("disabled");
  const votingClosed = state.voting.get('votingClosed');
  return {
    region,
    user,
    disabled,
    votingClosed
  };
}

export default connect(mapStateToProps)(Regions);

////////////CSS/////////////
const RegionsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 600px;
    padding: 10px;
    margin: 0 auto;
    pointer-events: ${props => (props.votingClosed ? 'all' : props.disableRegions > 0 ? 'none' : 'all')};
`;
