export default React => ({
	type = 'text',
	placeholderText = 'Type Here',
	className = '',
}) =>
	<input
		type={type}
		placeholder={placeholderText}
		className={`input ${className}`} />;
