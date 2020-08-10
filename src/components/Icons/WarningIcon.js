import React from 'react';

const WarningIcon = ({
  className,
  ...rest
}) => (
  <div className={"mdl2-disable-updates ".concat(className)} {...rest}></div>
)

export default WarningIcon;