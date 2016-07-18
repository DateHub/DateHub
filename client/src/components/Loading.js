import React from 'react';

const Loading = ({isLoading, newMatches}) => {
  if(isLoading) {
    return (
      <span>Loading...</span>
    );
  } else {
    return (
      <div>
        <span className="glyphicon glyphicon-heart margin-sides-small" aria-hidden="true"></span>  
        <span className="badge">{newMatches.length}</span>
      </div>
    );
  }
}

export default Loading;