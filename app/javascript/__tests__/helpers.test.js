import {formatDate} from '../helpers/helpers'

describe('formatDate', () => {
  test('日付がyyyy-mm-dd形式となること', () => {
    // 月は実際の月 - 1をDateのコンストラクタに指定する必要がある
    expect(formatDate(new Date(2022, 0, 14))).toBe('2022-01-14')
  })
})
