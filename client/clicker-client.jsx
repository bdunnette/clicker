MainLayout = React.createClass({
  render() {
    return <div>
      <header><h1>Kadira Blog</h1><AccountsUIWrapper /></header>
      <main>{this.props.content}</main>
      <footer>We love Meteor</footer>
    </div>;
  }
});

AccountsUIWrapper = React.createClass({
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  },
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
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
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Polls.insert({
      title: text,
      owner: Meteor.userId(),
      createdAt: new Date() // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  },
  // Loads items from the Polls collection and puts them on this.data.polls
  getMeteorData() {
    return {
      polls: Polls.find({},{sort:{createdAt:-1}}).fetch(),
      currentUser: Meteor.userId()
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
          <h1>Available Polls:</h1>
            { this.data.currentUser ?
              <form className="new-poll" onSubmit={this.handleSubmit} >
                <input
                  type="text"
                  ref="textInput"
                  placeholder="Type to add new polls" />
              </form> : ''
            }
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
    var data = {currentUser: Meteor.userId()};
    var pollId = this.props.pollId;
    var handle = Meteor.subscribe('Poll', pollId);
    if(handle.ready()) {
      data.post = Polls.findOne({_id: pollId});
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
