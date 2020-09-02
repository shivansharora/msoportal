import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import useRouter from 'utils/useRouter';


const AuthGuard = props => {
  const { roles, children } = props;

  const session = useSelector(state => state.session);
  const router = useRouter();

  useEffect(() => {
    if (!session.loggedIn || !session.user) {
      router.history.push('/auth/login');
      return;
    }
  }, [router]);

  return <Fragment>{children}</Fragment>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.array.isRequired
};

AuthGuard.defaultProps = {
  roles: []
};

export default AuthGuard;
