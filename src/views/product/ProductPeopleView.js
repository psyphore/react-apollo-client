import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';

import { getProductQuery } from '../../graphql';
import ProductPeopleContainer from '../../components/products/ProductPeopleContainer';
import { Loader, ErrorMessage } from '../../components';

const options = {
  options: ({ match }) => ({
    variables: {
      name: match.params.name
    }
  })
};

const ProductPeopleView = ({ data: { error, loading, product } }) => (
  <Fragment>
    {loading && <Loader />}
    {error && <ErrorMessage error={error} />}
    {!loading &&
      !error &&
      product && <ProductPeopleContainer product={product} />}
  </Fragment>
);

export default graphql(getProductQuery, options)(ProductPeopleView);
