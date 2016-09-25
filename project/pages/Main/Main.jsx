/* eslint-disable no-unused-vars */
/**
 * No fat arrows, as it doesn't allow binding the context via .call.
 * @param  {Object} component deps  	Object with the used components
 * @return {function}                      React.createElement on jsx.
 */
export default (React, debounce) => function ({
	CustomInput,
	Button,
	Switch,
	CardList,
	CheckboxList,
}) {
/* eslint-enable no-unused-vars */
	return (
		<section className="main container">
			<div className="row">
				<div className="col s6">
					<h6>Job Filters:</h6>
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
				<div className="col s12 m4">
					<label>The industry:</label>
					<CheckboxList
						className="categories"
						onClickFn={(e) => this.onClickCheckbox('category', e)}
						options={this.categories} />
				</div>

				<div className="col s12 m4">
					<label>The experience level required:</label>
					<CheckboxList
						className="levels"
						onClickFn={(e) => this.onClickCheckbox('level', e)}
						options={this.levels} />
				</div>

				<div className="col s12 m4">
					<label>The location:</label>
					<CheckboxList
						className="locations"
						onClickFn={(e) => this.onClickCheckbox('location', e)}
						options={this.locations} />
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
		</section>);
	};

