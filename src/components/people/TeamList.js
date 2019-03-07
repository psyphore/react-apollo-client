import React, { Fragment } from 'react';

import PersonC from './PersonChip';
import TitleRender from '../title';
import Link from 'react-router-dom/Link';

const BodyRender = ({ children, collection }) => (
  <div className={children}>
    {collection.map((person, index) => (
      <Link
        key={person.id + index}
        to={'/person/' + person.id}
        style={{ textDecoration: 'none' }}
      >
        <PersonC detail={person} />
      </Link>
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
