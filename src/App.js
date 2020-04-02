import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import './App.css';
import logo from './eroad_logo.png';
import { CssBaseline, AppBar, Typography, Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import Grid from '@material-ui/core/Grid';
import Survey from './components/survey/Survey';
import { GET_SURVEYS_URL, POST_SURVEY_RESULT_URL, AUTHORIZATION } from './constants';

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
    fetch(GET_SURVEYS_URL, {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'authorization': AUTHORIZATION
      }
    }).then(response => response.json())
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

  reset() {
    this.setState(this.initialState, this.fetchData);
  }

  postSurveyResult(surveyResult) {
    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'authorization': AUTHORIZATION
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return await response.json(); // parses JSON response into native JavaScript objects
    };

    console.info('posting', surveyResult);

    postData(POST_SURVEY_RESULT_URL, surveyResult)
      .then((data) => {
        console.log('post response', data); // JSON data parsed by `response.json()` call
      });

    this.reset();
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
              <img src={logo} alt="" className="logo" onClick={() => this.reset()} />
              <Typography variant="h6" color="inherit" noWrap>
                EROAD {this.state.activeSurveyId ? `– ${this.getActiveSurvey().name}` : ''}
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            {this.state.activeSurveyId ?
              <Survey survey={this.getActiveSurvey()} postSurveyResult={this.postSurveyResult.bind(this)} />
              :
              <React.Fragment>
                <Typography variant="h6" color="inherit">
                  Please select a survey
                </Typography>
                <br />
                <Grid container spacing={2}>
                  {this.state.surveys.map(survey => 
                    <Grid key={survey.id} item xs={12}>
                      <Button variant="outlined" onClick={(target) => this.setState({activeSurveyId: survey.id})}>{survey.name}</Button>
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
