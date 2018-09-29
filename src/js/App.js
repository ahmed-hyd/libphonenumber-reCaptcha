//framework imports
import React, { Component } from 'react';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';


import TelInput from './TelInput';

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
		return (
      <div id="everything" className="everything">
        <div id="content">
          <div id="header" className="header"/>
          <div id="body" className="body">
            <App centered={false} inline={true}>
              <Box pad="small">
                <Header>
                  <Title>libphonenumber-js IE 11 issue POC</Title>
                </Header>
              </Box>
              <Box pad="large" size="medium">
				<TelInput 
                  label="Phone Number"
                  error="false"
                  country="IN"
                  onBlur={() => {console.log("onBlue")}}
                  onChange={() => {console.log("OnChange")}}
                  isRequired
                  value=""
                />
			</Box>
            </App>
          </div>
        </div>
      </div>
    );
  }
}
