MainLayout = React.createClass({
  render() {
    return <div>
      <header><h1>Kadira Blog</h1></header>
      <main>{this.props.content}</main>
      <footer>We love Meteor</footer>
    </div>;
  }
});

PollRow = React.createClass({
  propTypes: {
    // This component gets the poll to display through a React prop.
    // We can use propTypes to indicate it is required
    poll: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li>{this.props.poll.title}</li>
    );
  }
});

PollList = React.createClass({
  mixins: [ReactMeteorData],
  // Loads items from the Polls collection and puts them on this.data.polls
  getMeteorData() {
    return {
      polls: Polls.find({}).fetch()
    }
  },
  renderPolls() {
    // Get polls from this.data.polls
    return this.data.polls.map((poll) => {
      return <PollRow key={poll._id} poll={poll} />;
    });
  },
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <ul>
          {this.renderPolls()}
        </ul>
      </div>
    );
  }
});

PollView = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var data = {};
    var postId = this.props.postId;
    var handle = Meteor.subscribe('Polls');
    if(handle.ready()) {
      data.post = Posts.findOne({_id: postId});
    }
    return data;
  },
  getContent() {
    return <div>
      <h3>{this.data.post.title}</h3>
      <p>{this.data.post.content}</p>
    </div>;
  },
  render() {
    return <div>
      <a href="/">Back</a>
      {this.data.post? this.getContent() : <p>Loading...</p>}
    </div>
  }
});

FlowRouter.route('/', {
  action() {
    ReactLayout.render(MainLayout, {content: <PollList />});
  }
});

FlowRouter.route('/p/:pollId', {
  action(params) {
    ReactLayout.render(MainLayout, {content: <PollView {...params} />});
  }
});
