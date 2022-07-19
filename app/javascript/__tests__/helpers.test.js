import {formatDate} from '../helpers/helpers'

describe('formatDate', () => {
  test('日付がyyyy-mm-dd形式となること', () => {
    // 月は実際の月 - 1をDateのコンストラクタに指定する必要がある
    // 月が1桁の場合、0埋めされること
    expect(formatDate(new Date(2022, 0, 14))).toBe('2022-01-14')
    // 日が1桁の場合、0埋めされること
    expect(formatDate(new Date(2022, 0, 3))).toBe('2022-01-03')
    // 月が2桁の場合、0埋めされないこと
    expect(formatDate(new Date(2022, 9, 4))).toBe('2022-10-04')
    // 日が2桁の場合、0埋めされないこと
    expect(formatDate(new Date(2022, 10, 13))).toBe('2022-11-13')
  })
})
