import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import gql from 'graphql-tag';
import _ from 'lodash';



import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


import AWSAppSyncClient from 'aws-appsync';
import { ApolloProvider, graphql } from 'react-apollo';

import styles from './styles';
import Footer from './Components/Footer';

const client = new AWSAppSyncClient({
    url: 'https://wnbljnl5mnbvbm2wmw425hldoe.appsync-api.us-east-2.amazonaws.com/graphql',
    region: 'us-east-2',
    auth: {
        type: 'API_KEY',
        apiKey: 'dmtest',
    }
});

const tiers = [
    {
        title: 'Wellness',
        description: [
            'Take a mindful break',
            'Get out and exercise',
            'Find an event',
        ],
        buttonText: 'Help me relax',
        buttonVariant: 'outlined',
    },
    {
        title: 'Action',
        subheader: 'Most popular',
        description: [
            'Find a cause',
            'Learn what you can do',
            'Take action today',
        ],
        buttonText: 'Let\'s do this!',
        buttonVariant: 'contained',
    },
    {
        title: 'Learning',
        description: [
            'Learn a new skill',
            'Dive into history',
            'Discover your community'
        ],
        buttonText: 'Get smarter every day',
        buttonVariant: 'outlined',
    },
];

function CallToAction() {
    const classes = styles();

    return (
        <React.Fragment>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Vigor
                    </Typography>
                    <nav>
                        <Link
                            variant="button" color="textPrimary"
                            href="http://twitter.com/intent/tweet?text=I'm+turning+boredom+into+action+on+Vigor+https://vigor-dev-staticsitebucket-1n5jgthz8o4rx.s3.us-east-2.amazonaws.com/index.html" className={classes.link}
                        >
                            Tweet About It!
                        </Link>
                    </nav>
                    <Button href="#" color="primary" variant="outlined" className={classes.link}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            {/* Hero unit */}
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Turn Boredom Into Action
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    It's hard to choose where to spend your energy outside of work, school, or home life.
                    Is it time to zone out and watch TV? Are you taking time to improve yourself?
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map(tier => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                                    className={classes.cardHeader}
                                />
                                <CardContent>
                                    <ul>
                                        {tier.description.map(line => (
                                            <Typography component="li" variant="subtitle1" align="center" key={line}>
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant} color="primary">
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}


function AppRouter() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Router>
                <CallToAction />
            </Router>
            <Footer />
        </React.Fragment>
    );
}

export default AppRouter;
