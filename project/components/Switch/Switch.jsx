export default React => ({
	className = '',
	labelOn = 'On',
	labelOff = 'Off',
	onClick = () => {},
}) =>
	<div className={`switch switch-input ${className}`}>
    <label>
      {labelOff}
      <input
      	type="checkbox"
      	onClick={(e) => onClick(e)} />
      <span className="lever"></span>
      {labelOn}
    </label>
  </div>;

