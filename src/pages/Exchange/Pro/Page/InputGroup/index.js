import React from 'react';

import AssetIcon from 'elements/AssetIcon';
import positiveNumberMask from 'validators/masks/positiveNumber';

import {
  Group,
  Label,
  LabeledInputContainer,
  LabeledInput,
  InputIcon
} from './styled';
import { propTypes } from './props';

const PRICE_PRECISION = 6;

class InputGroup extends React.PureComponent {
  static propTypes = propTypes;

  handleChange = e => {
    const { onChange, value: prevValue, precision } = this.props;

    let value = e.target.value;

    if (onChange && value !== prevValue) {
      onChange(positiveNumberMask(value, precision || PRICE_PRECISION));
    }
  };

  render() {
    const { value, asset, id, placeholder, label } = this.props;

    return (
      <Group data-testid={this.props.dataTestId}>
        <Label htmlFor={id}>{label}</Label>
        <LabeledInputContainer>
          <LabeledInput
            innerRef={el => (this.inputElement = el)}
            type="text"
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={this.handleChange}
          />
          <InputIcon onClick={() => this.inputElement.focus()}>
            <AssetIcon assetName={asset} />
          </InputIcon>
        </LabeledInputContainer>
      </Group>
    );
  }
}

export default InputGroup;
