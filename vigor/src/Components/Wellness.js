import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import _ from 'lodash';

import styles from '../styles';

const boredAction = gql`
query Bored {
  getBoredAction {
      Id
      Title
  }
}`;

export default function Wellness() {
    const classes = styles();
    return (<React.Fragment>
        <br/>
        <br/>
        <Container component="main" maxWidth="md">
            <Query query={boredAction}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    return (
                        <Card>
                            <CardHeader
                                title={data.getBoredAction.Title}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                            />
                            <CardContent>
                                <ul>
                                    <Typography component="li" variant="subtitle1" align="center">
                                        {data.getBoredAction.Title}
                                    </Typography>
                                </ul>
                            </CardContent>
                            <CardActions>
                                <Button fullWidth href='#' variant='contained' color="primary">
                                    Do it
                                </Button>
                            </CardActions>
                        </Card>
                    );
                }}
            </Query>
        </Container>
    </React.Fragment>)
}
