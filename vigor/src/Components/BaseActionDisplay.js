import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import _ from 'lodash';

import styles from '../styles';

const takeAction = gql`
query Act ($cat: String, $nextToken: String) {
  getActions(category: $cat, nextToken: $nextToken) {
      items {
          Id
          Title
          Link
          Description
          CallToAction
      }
      nextToken
  }
}`;

const addPoint = gql`
mutation PutScore ($user: String) {
  putScore(user: $user) {
    score
  }
}`;


export default function BaseActionDisplay({category, location}) {
    const classes = styles();
    const uname = window.localStorage.getItem(
        _.first(_.filter(Array.apply(0, new Array(localStorage.length)).map(function (o, i) {
            return localStorage.key(i);
        }) , o => o.endsWith('LastAuthUser'))));
    console.log(uname)

    return (
        <Container style={{ marginTop: '5em'}} component="main" maxWidth="sm">
            <Query query={takeAction} variables={{ cat: category}}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    return (
                        <React.Fragment>
                            {_.first(_.map(_.shuffle(
                                _.filter(
                                    data.getActions.items,
                                    action => window.localStorage.getItem(action.Id) < (Date.now() / 1000) - 30
                                )), (action => (
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography style={{paddingBottom: '1em', fontSize: '2.5em'}}>{action.Title}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography style={{paddingBottom: '2em'}}>{action.Description}</Typography>
                                    </Grid>
                                    <Grid style={{padding: '1em'}} item xs={12}>
                                    </Grid>
                                    <Grid item xs={3}>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Mutation mutation={addPoint} >
                                            {
                                                pointScore => (
                                        <Button style={{fontSize: "1.2em"}} fullWidth target='_blank' href={action.Link}
                                                variant='contained' color="primary"
                                                onClick={f => {pointScore({ variables:{user: uname}} )}}
                                        >
                                            {action.CallToAction}
                                        </Button>
                                                )
                                            }
                                        </Mutation>
                                    </Grid>
                                    <Grid item xs={3}>
                                    </Grid>
                                    <Grid style={{padding: '1em'}} item xs={12}>
                                    </Grid>
                                    <Grid item xs={3}>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button style={{fontSize: "1.2em"}} fullWidth variant='outlined' color="secondary"
                                                href={location + '/' + action.Id}
                                                onClick={f => {window.localStorage.setItem(action.Id, (Date.now() / 1000))}}
                                        >
                                            Something Else
                                        </Button>
                                    </Grid>
                                </Grid>
                            ))))}
                        </React.Fragment>
                    );
                }}
            </Query>
        </Container>
    )
}
