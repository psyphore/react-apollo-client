import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`;

export default props => {
  let { detail, sizeClass } = props;
  return (
    <div>
      {detail.avatar ? (
        <Avatar
          size={sizeClass || 60}
          src={baseUrl + detail.avatar}
          className={classNames({ margin: 10 }, { width: 60, height: 60 })}
          alt={detail.firstname + ' ' + detail.lastname}
        />
      ) : (
        <Avatar
          sizes={sizeClass || 60}
          className={classNames({ margin: 10 }, { width: 60, height: 60 })}
          alt={detail.firstname + ' ' + detail.lastname}
        >
          {detail.firstname.substring(0, 1) + detail.lastname.substring(0, 1)}
        </Avatar>
      )}
    </div>
  );
};
/**
 * 
 * 
 * ```
  {data.me.avatar ? (
            <Avatar
              alt={data.me.firstname + ' ' + data.me.lastname}
              src={baseUrl + data.me.avatar}
              className={classNames(
                classes.avatar,
                classes.bigAvatar
              )}
            />
          ) : (
            <Avatar
              alt={data.me.firstname + ' ' + data.me.lastname}
              className={classNames(
                classes.avatar,
                classes.bigAvatar
              )}
            >
              {data.me.firstname.substring(0, 1) +
                data.me.lastname.substring(0, 1)}
            </Avatar>
          )}
 * ```
 */
