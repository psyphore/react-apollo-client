import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';

import { lunchNotification } from '../../graphql/subscriptions/lunch';
import { getMyNotificationsQuery } from '../../graphql/queries/person';

const MessageItem = ({ message }) => (
  <li style={{ borderTop: '1px solid lightgray' }}>
    <p>
      {message.id || 'Anonymous'}: {message.subject} ({message.body})
    </p>
  </li>
);

const MessageListView = class extends PureComponent {
  componentDidMount() {
    const { subscribeToMore } = this.props;
    subscribeToMore();
  }

  render() {
    const {
      data: { myNotifications }
    } = this.props;

    return (
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {myNotifications.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
      </ul>
    );
  }
};

export const MessageList = () => (
  <Query query={getMyNotificationsQuery}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      const more = () =>
        subscribeToMore({
          document: lunchNotification,
          updateQuery: (prev, { subscriptionData: { data } }) => {
            if (!data) return prev;
            console.log(data.meals);
            const result = {
              myNotifications: [data.meals, ...prev.myNotifications],
              ...prev
            };
            return result;
          }
        });
      return <MessageListView data={data} subscribeToMore={more} />;
    }}
  </Query>
);
