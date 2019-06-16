import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import _ from 'lodash';

import styles from '../styles';

const getScore = gql`
query Score ($user: String) {
  getScore(user: $user) {
      score 
  }
}`;

export default function ScoreView() {
    const classes = styles();
    const uname = window.localStorage.getItem(
        _.first(_.filter(Array.apply(0, new Array(localStorage.length)).map(function (o, i) {
            return localStorage.key(i);
        }) , o => o.endsWith('LastAuthUser'))));
    console.log(uname)
    return (<React.Fragment>
            <Query query={getScore} variables={{ user: uname }}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    if (data.getScore === null) return <Typography>0</Typography>;
                    return (
                        <Typography>
                            {data.getScore.score}
                        </Typography>
                    );
                }}
            </Query>
        </React.Fragment>
    )
}