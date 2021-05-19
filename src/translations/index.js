import defaultsDeep from 'lodash/defaultsDeep'

import en from './en'
import tr from './tr'
import de from './de'
import es from './es'
import fr from './fr'
import jp from './jp'
import ko from './ko'
import ru from './ru'
import zh from './zh'

export default [{
  name: 'English',
  code: 'en',
  content: en,
}, {
  name: 'Deutsch',
  code: 'de',
  content: defaultsDeep(de, en),
}, {
  name: 'Español',
  code: 'es',
  content: defaultsDeep(es, en),
}, {
  name: 'Français',
  code: 'fr',
  content: defaultsDeep(fr, en),
}, {
  name: '日本語',
  code: 'jp',
  content: defaultsDeep(jp, en),
}, {
  name: '한국어',
  code: 'ko',
  content: defaultsDeep(ko, en),
}, {
  name: 'Русский',
  code: 'ru',
  content: defaultsDeep(ru, en),
}, {
  name: 'Türkçe',
  code: 'tr',
  content: defaultsDeep(tr, en),
}, {
  name: '中文',
  code: 'zh',
  content: defaultsDeep(zh, en),
}]