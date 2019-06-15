import React from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';



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


import AWSAppSyncClient from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import _ from 'lodash';

import styles from './styles';
import Footer from './Components/Footer';
import Wellness from './Components/Wellness';
import Action from './Components/Action';
import Learning from './Components/Learning';

import config from './awsconfig';
const key_client = new AWSAppSyncClient(config.AppSync.KEY);
const pool_client = new AWSAppSyncClient(config.AppSync.USER_POOL);

const tiers = [
    {
        title: 'Wellness',
        description: [
            'Take a mindful break',
            'Get out and exercise',
            'Find an event',
        ],
        href: "#activity/wellness",
        buttonText: 'Help me relax',
        buttonVariant: 'contained',
    },
    {
        title: 'Action',
        href: "#activity/action",
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
        href: "#activity/learning",
        description: [
            'Learn a new skill',
            'Dive into history',
            'Discover your community'
        ],
        buttonText: 'Get smarter every day',
        buttonVariant: 'contained',
    },
];
function MenuBar() {
    const classes = styles();

    return (
        <React.Fragment>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        <Link href="#">Vigor</Link>
                    </Typography>
                        <Button
                            variant="contained" color="primary"
                            href="http://twitter.com/intent/tweet?text=I'm+turning+boredom+into+action+on+Vigor+https://vigor-dev-staticsitebucket-1n5jgthz8o4rx.s3.us-east-2.amazonaws.com/index.html"
                            className={classes.link}
                        >
                            Tweet About It!
                        </Button>
                    <Button href="#" color="primary" variant="outlined" className={classes.link}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

function ActionCompactMenu() {
    const classes = styles();

    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <br/>
                <br/>
                <br/>
                <br/>
                <Grid container spacing={5} alignItems="flex-end">
                    {[['Wellness', '#activity/wellness'], ['Action', '#activity/action'], ['Learning', '#activity/learning'], ].map(tier => (
                        <Grid item key={tier[0]} xs={12} md={4}>
                            <Button align="center" fullWidth href={tier[1]}>{tier[0]}</Button>
                        </Grid>
                        ))}
                </Grid>
            </Container>
        </React.Fragment>
    )
}

function CallToAction() {
    const classes = styles();

    return (
        <React.Fragment>
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
                                    <Button fullWidth href={tier.href} variant={tier.buttonVariant} color="primary">
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
            <ApolloProvider client={key_client}>
                <CssBaseline />
                <MenuBar />
                <Router hashType="noslash">
                    <Switch>
                        <Route exact path="/" component={CallToAction} />
                        <Route path="/activity/wellness" component={Wellness} />
                        <Route path="/activity/action" component={Action} />
                        <Route path="/activity/learning" component={Learning} />
                    </Switch>
                    <Route path="/activity" component={ActionCompactMenu} />
                </Router>
                <Footer />
            </ApolloProvider>
        </React.Fragment>
    );
}

export default AppRouter;
