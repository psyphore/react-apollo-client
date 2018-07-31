import React from 'react';
import { Subscription } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles'

import { lunchNotification } from '../../graphql/subscriptions/lunch'

const styles = {}

function Notes(props) {
  return (
    <div>
      <Subscription subscription={lunchNotification} variables={props}>
        {({ data, loading, error }) => (
          <div>
            {loading ? <span>Loading</span> : null}
            {error ? <span>{JSON.stringify(error)}</span> : null}
            {data && data.notifications ? (
              <span>{JSON.stringify(data)}</span>
            ) : null}
          </div>
        )}
      </Subscription>
    </div>
  );
}

export default withStyles(styles)(Notes);
/**
 * lunchNotification will have the following shape
 * @example```
 {
  "data": {
    "meals": {
      "id": "6945a2d3-09f0-4f01-a3a2-047bf3873715",
      "subject": "meals - 1532963708719",
      "body": "{\"id\":\"02f3fb85-5c55-469d-ad91-57b389162714\",\"google\":\"OK\",\"order\":\"Chicken wrap with bacon, avo & mozzarella cheese and salad with avo slices\"}"
    }
  }
}
 ```
 */