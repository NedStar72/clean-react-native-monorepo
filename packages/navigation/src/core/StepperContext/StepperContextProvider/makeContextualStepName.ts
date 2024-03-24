import { BaseSteps, ConfigIdentifier } from '../../ConfigContext';

function makeContextualStepName<Steps extends BaseSteps>(
  configIdentifier: ConfigIdentifier,
  step: keyof Steps,
) {
  // FIXME: casting to string
  return `${configIdentifier}_${step as string}`;
}

export default makeContextualStepName;
