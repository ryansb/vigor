import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


import gql from 'graphql-tag';
import { Query } from 'react-apollo';
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

export default function BaseActionDisplay({category}) {
    const classes = styles();
    return (
        <Container component="main" maxWidth="md">
            <Query query={takeAction} variables={{ cat: category}}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    return (
                        <React.Fragment>
                            {_.map(data.getActions.items, (action => (
                                <Card className={classes.cardAction} key={action.Id}>
                                    <CardHeader
                                        title={action.Title}
                                        titleTypographyProps={{ align: 'center' }}
                                        subheaderTypographyProps={{ align: 'center' }}
                                        className={classes.cardHeader}
                                    />
                                    <CardContent>
                                        <ul>
                                            <Typography component="li" variant="subtitle1" align="center">
                                                {action.Description}
                                            </Typography>
                                        </ul>
                                    </CardContent>
                                    <CardActions>
                                        <Button fullWidth href={action.Link} variant='contained' color="primary">
                                            {action.CallToAction}
                                        </Button>
                                        <Button fullWidth href={action.Link} variant='outlined' color="secondary">
                                            Not today
                                        </Button>
                                    </CardActions>
                                </Card>
                            )))}
                        </React.Fragment>
                    );
                }}
            </Query>
        </Container>
    )
}
