module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },

    "extends": [
        "google",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    },
    "rules": {
        "react/prop-types": 0
    }
};