const React = require('react');
const AsyncStorage = require('@react-native-async-storage/async-storage')

 export const AuthContext = () => {
    var context = React.CreateContext("")
    return context;
  };

 export const useAuthContext = () => {
    var use = React.UseContext(AuthContext);
    return use;
  };