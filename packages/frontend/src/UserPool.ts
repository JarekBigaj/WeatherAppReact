import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-north-1_i7TsMpBUN",
    ClientId: "5gim4ec56ngvq08rk7del2t3k0"
};

export default new CognitoUserPool(poolData);