export default React => ({
	className = '',
	options,
}) => {
	if (typeof options == 'undefined') {
		return null;
	}

	if (options && !options.length) {
		return <h4>No Results Found.</h4>;
	}

	const singleCard = (className = '', { name = '', company = {}, refs = {}, id}) =>
		<div key={`${name}-${company.name}-${id}`} className={`${className}`}>
			<div className="col s12 m6">
				<div className="card blue-grey darken-1">
					<div className="card-content white-text">
						<div className="card-title">{`${name.toLowerCase()}`}</div>
						<p>{`${company.name}`}</p>
					</div>
					<div className="card-action">
						<a href={`${refs.landing_page}`}>See Job</a>
					</div>
				</div>
			</div>
		</div>;

	const cardList = options.map((option) =>
		singleCard(className, option));

	return (
		<div className={`row ${className}-list`}>
			{ cardList }
		</div>
	);
};
