import React, { PropTypes } from 'react';

import './main.css';

// Components
import createButton from '../../components/Button/Button';
import createCustomInput from '../../components/CustomInput/CustomInput';
import createCustomRadio from '../../components/CustomRadio/CustomRadio';

import { getJobs } from '../../services/api-service';

/* eslint-disable no-unused-vars */
const CustomInput = createCustomInput(React);
const Button = createButton(React);
const CustomRadio = createCustomRadio(React);
/* eslint-enable no-unused-vars */

const descendingOptions = [
	{
		text: 'Ascending',
		default: true,
		value: false,
	},
	{
		text: 'Descending',
		value: true,
	},
];

const defaultState = {
	page: 1,
	descending: false,
	company: '',
	category: [],
	level: [],
	location: [],
};

class Main extends React.Component {
	componentWillMount() {
		this.setState(defaultState);
	}

	onToggleDescendingFn(e) {
		this.setState({
			descending: !!e.currentTarget.value,
		});
	}

	onClickFn() {
		// perform search
		console.log('Search', getJobs(this.state));
	}

	render() {
		return (
			<section className="main container">
				<div className="row">
					<CustomRadio
						className="descending-order"
						options={this.props.descendingOptions}
						onChange={(e) => this.onToggleDescendingFn(e)} />

					<CustomInput
						type="text"
						placeholderText="Type Thingy Here"
						className="special-input" />

					<Button
						className="search"
						onClickFn={() => this.onClickFn()}
						text={'Search'} />
				</div>
			</section>
		);
	}
}

Main.propTypes = {
  descendingOptions: PropTypes.array.isRequired,
};

Main.defaultProps = {
	descendingOptions,
};

export default Main;
