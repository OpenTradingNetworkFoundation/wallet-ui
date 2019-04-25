import React from 'react';
import Select from 'react-select';

import ArrowDownIcon from 'icons/arrow-down.svg';

import { propTypes } from './props';

import {
  Dropdown,
  SelectedValue,
  ArrowDown,
  Menu,
  List,
  Header,
  Value
} from './styled';

const ProDropdown = ({ onChange, value, options }) => (
  <Dropdown>
    <Select
      searchable={false}
      clearable={false}
      options={options}
      value={value}
      onChange={onChange}
      valueRenderer={({ id }) => (
        <Header>
          <SelectedValue>{id}</SelectedValue>
          <ArrowDown>
            <ArrowDownIcon />
          </ArrowDown>
        </Header>
      )}
      menuRenderer={({ options, onSelect }) => {
        return (
          <Menu>
            <List>
              {options.map(option => (
                <Value
                  key={option.id}
                  onClick={() => onSelect(option)}
                  selected={option.id === value.id}
                >
                  {option.id}
                </Value>
              ))}
            </List>
          </Menu>
        );
      }}
    />
  </Dropdown>
);

ProDropdown.propTypes = propTypes;

export default ProDropdown;
