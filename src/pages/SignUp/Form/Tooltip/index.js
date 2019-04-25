import React from 'react';

import Tooltip from 'elements/Tooltip';
import cn from 'utils/bem';
import localizer from 'utils/localizer';
import translate from 'services/translate';
import { LENGTH_PARAMS } from 'validators/accountName';

import QuestionIcon from 'icons/question.svg';

import './style.styl';

const b = cn('name-rules-tooltip');

const getRules = () => [
  translate('validation.accountName.length', LENGTH_PARAMS),
  localizer.getValue('validation.accountName.invalid.number'),
  localizer.getValue('validation.accountName.invalid.regexp'),
  localizer.getValue('validation.accountName.invalid.hyphen'),
  localizer.getValue('validation.accountName.invalid.dot')
];

const NameRulesTooltip = () => (
  <Tooltip
    className={b()}
    hideOnClick={false}
    contentClassName={b('content')}
    mods={['dark']}
    renderTooltip={() => <QuestionIcon className={b('icon')} />}
    renderTitle={() => (
      <React.Fragment>
        <span className={b('title')}>
          {localizer.getValue('page.signUp.rulesTitle')}
        </span>
        <ul className={b('list')}>
          {getRules().map((
            rule
            // TODO use translate component here
          ) => (
            <li key={rule} className={b('rule')}>
              <span> {rule} </span>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )}
  />
);

export default NameRulesTooltip;
