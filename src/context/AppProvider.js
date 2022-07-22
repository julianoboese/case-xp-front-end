import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [user, setUser] = useState({ firstName: '', lastName: '' });
  const [balance, setBalance] = useState(0);
  const [currentAsset, setCurrentAsset] = useState({});
  const [currentOperation, setCurrentOperation] = useState('');
  const [operations, setOperations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <AppContext.Provider
      value={{
        isActionOpen,
        setIsActionOpen,
        user,
        setUser,
        balance,
        setBalance,
        currentAsset,
        setCurrentAsset,
        currentOperation,
        setCurrentOperation,
        operations,
        setOperations,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
