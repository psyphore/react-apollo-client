import React, { Fragment } from 'react';

import PersonC from './PersonChip';
import TitleRender from '../title';

const BodyRender = ({ children, collection }) => (
  <div className={children}>
    {collection.map((person, index) => (
      <PersonC key={person.id + index} detail={person} />
    ))}
  </div>
);

export default ({ classes: { actionPaper, children }, title, collection }) =>
  collection &&
  collection.length !== 0 && (
    <Fragment>
      <TitleRender title={title} action={actionPaper} />
      <BodyRender collection={collection} children={children} />
    </Fragment>
  );
