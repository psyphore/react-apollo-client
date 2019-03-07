import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';

import { getProductQuery } from '../../graphql';
import ProductPeopleContainer from '../../components/products/ProductPeopleContainer';
import { Loader, ErrorBoundary } from '../../components';

const options = {
  options: ({ match }) => ({
    variables: {
      name: match.params.name
    }
  })
};

const ProductPeopleView = ({ data: { error, loading, product } }) => (
  <ErrorBoundary>
    <Fragment>
      {loading && <Loader />}
      {!loading &&
        !error &&
        product && <ProductPeopleContainer product={product} />}
    </Fragment>
  </ErrorBoundary>
);

export default graphql(getProductQuery, options)(ProductPeopleView);
