import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';

import styles from '../styles';

const footers = [
    {
        title: 'Sources',
        description: [
            {text: 'Bored API', url: 'https://boredapi.com'},
            {text: 'Step Out Buffalo', url: 'https://stepoutbuffalo.com/'},
            {text: 'The North Star', url: 'https://thenorthstar.com/'},
            {text: 'Citizen Science', url: 'https://www.citizenscience.gov/catalog/#'},
        ],
    },
    {
        title: 'Resources',
        description: [{text: 'Github Repo', url: 'https://github.com/ryansb/vigor'}],
    },
    {
        title: 'Legal',
        description: [{text: 'Privacy policy', url: '#'}, {text: 'License', url: 'https://github.com/ryansb/vigor/blob/master/LICENSE.txt'}],
    },
];

export default function Footer() {
    const classes = styles();
    return (<React.Fragment>
        <Container maxWidth="md" component="footer" className={classes.footer}>
            <Grid container spacing={4} justify="space-evenly">
                {footers.map(footer => (
                    <Grid item xs={6} sm={3} key={footer.title}>
                        <Typography variant="h6" color="textPrimary" gutterBottom>
                            {footer.title}
                        </Typography>
                        <ul>
                            {footer.description.map(item => (
                                <li key={item.text}>
                                    <Link href={item.url || '#'} variant="subtitle1" color="textSecondary">
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </React.Fragment>)
}
