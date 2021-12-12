import React from 'react';
import { GoogleLogout } from 'react-google-login';


const clientId =
  '309902236495-la40njvkv798m3dd2d46nssk3gr6dkmq.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;