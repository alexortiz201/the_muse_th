import React, { PropTypes } from 'react';
import debounce from 'lodash/debounce';

import './main.css';

// Components
import createButton from '../../components/Button/Button';
import createCustomInput from '../../components/CustomInput/CustomInput';
import createSwitch from '../../components/Switch/Switch';
import createCardList from '../../components/Card/Card';

import { createGetJobsWithCache } from '../../services/api-service';

/* eslint-disable no-unused-vars */
const CustomInput = createCustomInput(React);
const Button = createButton(React);
const Switch = createSwitch(React);
const CardList = createCardList(React);
/* eslint-enable no-unused-vars */

const cache = {};

class Main extends React.Component {
	componentWillMount() {
		this.setState({ ...this.props });
		this.getJobs = createGetJobsWithCache(cache);
		this.pageNumberInputVal = this.props.page;
	}

	nextPage() {
		if (!this.jobs.length) {
			return;
		}

		const page = this.state.page + 1;
		this.setState({ page, });
	}

	lastPage() {
		if (this.state.page === 1) {
			return;
		}

		const page = this.state.page - 1;
		this.setState({ page, });
	}

	/**
	 * Implemented memoization
	 * @return {[type]} [description]
	 */
	getAllJobs() {
		this.getJobs(this.state)
			.then(json => this.renderJobs(json))
			// .then(jobs => this.nextPage(jobs))
			.catch(err => console.log(err));
	}

	renderJobs(json) {
		this.jobs = json.results;
		this.setState(this.state);
	}

	onToggleDescendingFn(e) {
		const val =  e.currentTarget.checked ? true : false;
		this.setState({ descending: val, });
	}

	onClickFn() {
		this.setState({
			company: this.companyInputVal,
		}, this.getAllJobs);
	}

	updateCompanyName(val) {
		this.companyInputVal = val;
	}

	updatePageNumber(val) {
		this.setState({ page: parseInt(val, 10), });
	}

	render() {
		return (
			<section className="main container">
				<div className="row">
					<div className="col s6">
						<h6>Job Filters: </h6>
					</div>
					<div className="col s6">
						<Switch
							className="descending-order"
							labelOff="Ascending"
							labelOn="Descending"
							onClick={(e) => this.onToggleDescendingFn(e)} />
					</div>
				</div>

				<div className="row">
					<div className="col s6">
						<label>Search by:</label>
						<CustomInput
							type="text"
							placeholderText="Company name"
							className="company-input"
							updateCompanyName={ debounce((val) => this.updateCompanyName(val), 300) }
							onEnter={() => this.onClickFn()} />
					</div>

					<div className="col s6">
						<label>Page</label>
						<CustomInput
							type="number"
							min="1"
							placeholderText="Search by company name"
							className="company-input"
							defaultValue={this.state.page}
							updateCompanyName={ debounce((val) => this.updatePageNumber(val), 300) }
							onEnter={() => this.onClickFn()} />
					</div>
				</div>

				<div className="row">
					<div className="col s12 m6">
						<Button
							className="search"
							onClickFn={() => this.onClickFn()}
							text={'Search'} />
					</div>
				</div>

				<div className="row">
					<div className="col s12 m12">
						<CardList
							className="job"
							options={this.jobs} />
					</div>
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
