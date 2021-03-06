import React from 'react';
import PropTypes from 'prop-types';

import {searchProps, requestProps} from 'types/proptypes';

import Card from 'components/Card';
import Error from 'components/Error';
import Loading from 'components/Loading';

class Search extends React.Component {
  componentWillMount() {
    const {request, search, params} = this.props;

    if (request.fetching !== true && request.receivedAt === null) {
      search(params);
    }
  }

  render() {
    const {request, details} = this.props;

    if (request.fetching !== true && request.receivedAt === null) {
      return null;
    }

    if (request.error !== null) {
      return <Error message={request.error}/>;
    }

    if (details === null) {
      return <Loading/>;
    }

    return (
      <Card header="Search Results">
        {this.getComponent()}
      </Card>
    );
  }

  getComponent() {
    const {details, params} = this.props;

    const trains = [];
    details.results.forEach(function(train) {
      trains.push(<TrainLink key={train.id} id={train.id}/>);
    });

    return (
      <div className="search-results">
        <div className="search-results-header">
          Results for <span className="sha-flat">{params.commit}</span>
        </div>
        {trains}
      </div>
    );
  }
}

Search.propTypes = {
  details: searchProps,
  params: PropTypes.shape().isRequired,
  request: requestProps.isRequired,
  search: PropTypes.func.isRequired
};

class TrainLink extends React.Component {
  render() {
    const {id} = this.props;

    return (
      <a href={"/train/" + id}>
        <button className="train-link">
          Train {id}
        </button>
      </a>
    );
  }
}

TrainLink.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Search;
