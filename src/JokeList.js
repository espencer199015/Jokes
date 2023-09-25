import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.css';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    const { numJokesToGet } = this.props;
    let jokesList = [...this.state.jokes];
    let seenJokes = new Set();

    try {
      while (jokesList.length < numJokesToGet) {
        let res = await axios.get('https://icanhazdadjoke.com', {
          headers: { Accept: 'application/json' }
        });

        let { status, ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          jokesList.push({ ...jokeObj, votes: 0 });
        } else {
          console.error('Duplicate found!');
        }
      }

      this.setState({ jokes: jokesList });
    } catch (e) {
      console.log(e);
    }
  }

  generateNewJokes = () => {
    this.setState({ jokes: [] });
    this.getJokes();
  };

  vote = (id, delta) => {
    this.setState((prevState) => ({
      jokes: prevState.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }));
  };

  render() {
    const { jokes } = this.state;

    if (jokes.length) {
      const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>

          {sortedJokes.map((j) => (
            <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
          ))}
        </div>
      );
    }

    return null;
  }
}

export default JokeList;