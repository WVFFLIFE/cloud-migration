import React from 'react'
import {SourceEnvironmentStep, TargetEnvironmentStep} from '../containers';

const EnvironmentStep = () => {
  return (
    <div>
      <SourceEnvironmentStep />
      <TargetEnvironmentStep />
    </div>
  )
}

export default EnvironmentStep;