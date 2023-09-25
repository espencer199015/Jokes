import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
  upVote = () => {
    const { id, vote } = this.props;
    vote(id, +1);
  };

  downVote = () => {
    const { id, vote } = this.props;
    vote(id, -1);
  };

  render() {
    const { votes, text } = this.props;

    return (
      <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={this.upVote}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={this.downVote}>
            <i className="fas fa-thumbs-down" />
          </button>

          {votes}
        </div>

        <div className="Joke-text">{text}</div>
      </div>
    );
  }
}

export default Joke;