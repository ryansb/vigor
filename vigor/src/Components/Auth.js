import React from 'react';
import Amplify, {Auth} from 'aws-amplify';
import { Authenticator, withAuthenticator } from 'aws-amplify-react';

Amplify.configure({
    Auth: {


        region: 'us-east-2',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-2_c3KUuV1II',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '2s0l08mpk5lbriufkh5osrsiga',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,
// Secret: 1d2homlbkrtkesreg98c7d01vb2ql62al2e70snipd91db4hu0df
        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        //authenticationFlowType: 'USER_PASSWORD_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});

export default Authenticator;