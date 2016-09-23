export default React => ({
	className = '',
	onClickFn = () => {},
	text = ''
}) =>
	<div
		className={`waves-effect waves-light btn btn-large btn-${className}`}
		onClick={onClickFn} >
		{text ? text : ''}
	</div>;
