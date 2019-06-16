export default {
    "UserAgent": "aws-amplify-cli/0.1.0",
    "Version": "1.0",
    "IdentityManager": {
        "Default": {}
    },
    "AppSync": {
        KEY: {
            url: "https://wnbljnl5mnbvbm2wmw425hldoe.appsync-api.us-east-2.amazonaws.com/graphql",
            region: "us-east-2",
            keyPrefix: 'vigor-api-key',
            disableOffline: true,
            auth: {
               type: "API_KEY",
               apiKey: "da2-by6ga52spzcxtnqowwfdvp3uli"
            }
        },
        USER_POOL: {
            url: "https://wnbljnl5mnbvbm2wmw425hldoe.appsync-api.us-east-2.amazonaws.com/graphql",
            region: "us-east-2",
            keyPrefix: 'vigor-user-pool',
            disableOffline: true,
            auth: {
              type: "AMAZON_COGNITO_USER_POOLS",
            }
        }
    }
}
