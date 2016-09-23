import React, { PropTypes } from 'react';

import './main.css';
import createMain from './Main';

// Components
import createButton from '../../components/Button/Button';
import createCustomInput from '../../components/CustomInput/CustomInput';

const Main = createMain(React);

/* eslint-disable no-unused-vars */
const CustomInput = createCustomInput(React);
const Button = createButton(React);
/* eslint-enable no-unused-vars */

const onClickFn = () => {
	console.log('Click'); // eslint-disable-line
};

const render = (props) =>
	<div className="row">
		<CustomInput
			type="text"
			placeholderText="Type Thingy Here"
			className="special-input" />

		<Button
			className="special"
			onClickFn={() => props.onClickFn()}
			text={'Special'} />
	</div>;

Main.defaultProps = {
	render,
	onClickFn,
};

Main.propTypes = {
  render: PropTypes.func.isRequired,
  onClickFn: PropTypes.func.isRequired,
};

export default Main;
