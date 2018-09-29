import React, { Fragment } from 'react';

import PersonC from './PersonChip';
import TitleRender from '../title';

const BodyRender = ({ children, collection }) => (
  <div className={children}>
    {collection.map(person => (
      <PersonC key={person.id} detail={person} />
    ))}
  </div>
);

export default ({ classes, title, collection }) =>
  collection &&
  collection.length !== 0 && (
    <Fragment>
      <TitleRender title={title} action={classes.actionPaper} />
      <BodyRender collection={collection} children={classes.children} />
    </Fragment>
  );
