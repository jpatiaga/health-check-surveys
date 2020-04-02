import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import './App.css';
import logo from './eroad_logo.png';
import { CssBaseline, AppBar, Typography, Button, IconButton } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

class App extends React.Component {
  initialState = {
    surveys: [],
    activeSurveyId: null
  }

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  fetchData() {
    fetch('http://localhost:3001/surveys')
      .then(response => response.json())
      .then(data => this.setState({surveys: data}));
  }

  componentDidMount() {
    this.fetchData();
  }

  getSurvey(id) {
    return this.state.surveys.filter(survey => survey.id === id)[0];
  }

  getActiveSurvey() {
    return this.getSurvey(this.state.activeSurveyId);
  }
  
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: red,
        secondary: blue,
      },
    });

    return (
      <React.Fragment>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <AppBar position="relative" color="primary">
            <Toolbar>
              <img src={logo} alt="" className="logo" onClick={() => this.setState(this.initialState, this.fetchData)} />
              <Typography variant="h6" color="inherit" noWrap>
                EROAD {this.state.activeSurveyId ? `– ${this.getActiveSurvey().name}` : ''}
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            {this.state.activeSurveyId ?
              <Container maxWidth="lg">
                <Grid container spacing={4} className="survey">
                  <Grid container spacing={2} className="question">
                    <Grid item xs="12" md="8">
                      <Typography variant="h6" color="inherit">
                        How are you feeling today?
                      </Typography>
                    </Grid>
                    <Grid item xs="12" md="4" className="center">
                      <IconButton aria-label="Very Dissatisfied">
                        <SentimentVeryDissatisfiedIcon color="secondary" fontSize="large" />
                      </IconButton>
                      <IconButton aria-label="Very Dissatisfied">
                        <SentimentDissatisfiedIcon color="secondary" fontSize="large" />
                      </IconButton>
                      <IconButton aria-label="Very Dissatisfied">
                        <SentimentVerySatisfiedIcon color="secondary" fontSize="large" />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} className="question">
                    <Grid item xs="12" md="8">
                      <Typography variant="h6" color="inherit">
                        Do you currently have fever of 38&#8451; or more?
                      </Typography>
                    </Grid>
                    <Grid item xs="12" md="4" className="center">
                      <Button variant="contained">No</Button>
                      <Button variant="contained">Yes</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
              :
              <React.Fragment>
                <Typography variant="h6" color="inherit">
                  Please select a survey
                </Typography>
                <br />
                <Grid container spacing={2}>
                  {this.state.surveys.map(survey => 
                    <Grid item xs="12">
                      <Button key={survey.id} variant="outlined" onClick={(target) => this.setState({activeSurveyId: survey.id})}>{survey.name}</Button>
                    </Grid>
                  )}
                </Grid>
              </React.Fragment>
            }
          </main>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
