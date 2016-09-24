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

class Main extends React.Component {
	componentWillMount() {
		this.setState({ ...this.props });
	}

	onToggleDescendingFn(e) {
		const val = e.currentTarget.value === 'true' ? true : false;

		this.setState({
			descending: val,
		});
	}

	onClickFn() {
		console.log('value set', this.state);
		console.log('Search', getJobs(this.state));
	}

	render() {
		return (
			<section className="main container">
				<div className="row">
					<CustomRadio
						className="descending-order"
						options={descendingOptions}
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
	page: PropTypes.number.isRequired,
  descending: PropTypes.bool,
  company: PropTypes.string,
	category: PropTypes.array,
	level: PropTypes.array,
	location: PropTypes.array,
};

Main.defaultProps = {
	page: 1,
	descending: false,
	company: '',
	category: [],
	level: [],
	location: [],
};

export default Main;
