import localizer from 'utils/localizer';
import templateEngine from 'utils/templateEngine';
import store from 'src/store';
import { translationSelectors } from 'ducks/translation';

export default function translate(path, params) {
  const language = translationSelectors.getCurrentLanguage(store.getState());
  const template = localizer.getValue(path, language);
  return templateEngine.render(template, params);
}
