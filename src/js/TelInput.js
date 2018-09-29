import React, { Component, PropTypes } from 'react';
import FormField from 'grommet/components/FormField';

import { ReactInput, parseDigit } from 'input-format';
import { asYouType } from 'libphonenumber-js';
const PhoneNumber = require('awesome-phonenumber');


export default class TelInput extends Component {
  constructor(...props) {
    super(...props);
    this._onChange = this._onChange.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._formatNumber = this._formatNumber.bind(this);
    this._parseDigit = this._parseDigit.bind(this);
    this._updateCountry = this._updateCountry.bind(this);
    this._isValid = this._isValid.bind(this);
    this._isPhoneValid = this._isPhoneValid.bind(this);

    this.state = {
      error: '',
      value: '',
      country: 'US',
      placeholder: ''
    };
  }

  componentWillMount() {
    this._updateCountry(this.props.country);
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  componentWillReceiveProps(nextProp) {
    // check for udpated prop value
    // if (nextProp.error !== this.props.error) {
    //   this.setState({
    //     error: nextProp.error
    //   });
    // }

    if (nextProp.value !== this.props.value) {
      this.setState({ value: nextProp.value }, () => {
        if (nextProp.isPhoneNumberUpdated) {
          this._isPhoneValid();
        }
      });
    }



    if (nextProp.country && nextProp.country != this.props.country) {
      this._updateCountry(nextProp.country);
      if (this.state.value) {
        const pn = PhoneNumber(this.state.value, this.state.country);
        // format phone number in "significant" e.g. -> '707123456'
        const formatedNumber = pn.getNumber('significant');
        this.setState({ value: formatedNumber ? formatedNumber : this.state.value  }, () => {
          this._isValid();
        });
      }
    }
  }

  _updateCountry(country) {
    this.setState({ country }, () => {
      const isValidCountry = PhoneNumber.getCountryCodeForRegionCode(country);
      let internationalFormattedNumber = '';
      if (isValidCountry !== 0) {
        internationalFormattedNumber = PhoneNumber.getExample(country).getNumber('international');
      }
      this.setState({ placeholder: internationalFormattedNumber });
    });
  }

  _isValid() {
    this._isPhoneValid();
    const isLengthMatched = this._isPhoneNumberLengthValid();

    let isValid = true;
    if (this.props.isRequired) {
      if (!isLengthMatched || _.trim(this.state.value) == '') {
        isValid = false;
      }
    }

    if (!isLengthMatched || this.state.error) {
      isValid = false;
    }
    if (!isLengthMatched || !isValid) {
      let error = (this.props.error) ? this.props.error : "Required field";

      this.setState({ error: error });
    }

    return isValid;
  }

  _isPhoneNumberLengthValid() {
    // check if phone number lenght is in betweek 5 - 15;
    const phoneNumber = this.state.value;
    const regionCode = PhoneNumber.getCountryCodeForRegionCode(this.state.country);
    const regionCodeLength = regionCode.toString().length;

    let isValid = true;

    let phoneLength = phoneNumber.length;

    if (phoneNumber.indexOf(`+${regionCode}`) >= 0) {
      phoneLength = phoneLength - (regionCodeLength + 1);
    };

    if (phoneLength < 5 || phoneLength > 15) {
      isValid = false;
    }

    return isValid;
  }

  _isPhoneValid() {
    // const pn = PhoneNumber( this.state.value, this.state.country );
    const isValid = this._isPhoneNumberLengthValid();

    if (!isValid && this.state.value) {
      this.setState({ error: this.props.error });
    } else {
      this.setState({ error: "" });
    }
  }

  _onChange(value) {
    console.log("Inside TelInput _Onchange");
    this.setState({ value: value, error: '' });
    if (this.props.onChange) { // check if parent component has onChange event.
      // Update input value to the parent componet onChange
      this.props.onChange(value);
    }
  }

  _onBlur() {
    const pn = PhoneNumber(this.state.value, this.state.country);
    const isValid = this._isPhoneNumberLengthValid();

    this._isPhoneValid();
    const updateNumber = pn.getNumber();
    if (this.props.onBlur && isValid && updateNumber) { // check if parent component has blur event.
      // Update input value to the parent componet onBlur
      this.props.onBlur(pn.getNumber());
    }
  }

  _formatNumber(value) {
    const asYouTypes = new asYouType(this.state.country);
    const text = asYouTypes.input(value);
    return {
      text,
      template: asYouTypes.template
    };
  }

  _parseDigit(character, value) {
    if (character === '+') {
      if (!value) {
        return character;
      }
    }
    return parseDigit(character);
  }

  render() {
    return (
      <FormField label={this.props.label} error={this.state.error}>
        <ReactInput
          value={this.state.value}
          placeholder={this.state.placeholder}
          onChange={this._onChange}
          onBlur={this._onBlur}
          parse={this._parseDigit}
          format={this._formatNumber}
          disabled={this.props.disabled}
        />
      </FormField>
    );
  }
}


TelInput.PropTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  country: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  value: PropTypes.string
};
