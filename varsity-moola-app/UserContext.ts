const React = require('react');

 export const AuthContext = () => {
    var context = React.createContext({
        userKey: 0,
        name: '',
        surname: '',
        income: 0,
        availableFunds: 0
      });
    return context;
  };

 export const useAuthContext = () => {
    var use = React.UseContext(AuthContext);
    return use;
  };