import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getPosts} from './actions/posts';

import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import useStyles from './styles';
import image from './images/memories.png'

import Posts from './components/Posts';
import Form from './components/Form';


const App = () => {
    const [currentId, setCurrentId] = useState(0);
    const classes = useStyles();

    const dispatch = useDispatch();
    useEffect(()=>{
        console.log('useEffect getPosts')
        dispatch(getPosts())
    }, [currentId, dispatch])
    
    return (
        <Container maxwidth='lg'>
            <AppBar className={classes.appBar} position='static' color='inherit' >
                <Typography className={classes.heading} variant='h2' align='center' >Memories</Typography>
                <img className={classes.image} src={image} alt='memories' height='60' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3} >
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;