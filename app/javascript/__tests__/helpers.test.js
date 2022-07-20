import {formatDate, isEmptyObject, validateEvent} from '../helpers/helpers'

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

describe('isEmptyObject', () => {
  test('空のオブジェクトを与えたときにtrueが返ること', () => {
    expect(isEmptyObject({})).toBeTruthy()
  })

  test('値があるオブジェクトを与えたときにfalseが返ること', () => {
    expect(isEmptyObject({a: 'foobar'})).toBeFalsy()
  })
})

describe('validateEvent', () => {
  test('typeが空文字のとき、戻り値のevent_typeにはエラーメッセージが入っていること', () => {
    expect(validateEvent({type: ''}).event_type).toBe('You must enter an event type')
  })
  test('event_dateが日付の文字列でないとき、戻り値のevent_typeにはエラーメッセージが入っていること', () => {
    expect(validateEvent({event_date: '2022-12-99'}).event_date).toBe('You must enter a valid date')
  })
  test('titleが空文字のとき、戻り値のevent_titleにはエラーメッセージが入っていること', () => {
    expect(validateEvent({title: ''}).title).toBe('You must enter a title')
  })
  test('speakerが空文字のとき、戻り値のevent_speakerにはエラーメッセージが入っていること', () => {
    expect(validateEvent({speaker: ''}).speaker).toBe('You must enter at least one speaker')
  })
  test('hostが空文字のとき、戻り値のevent_hostにはエラーメッセージが入っていること', () => {
    expect(validateEvent({host: ''}).host).toBe('You must enter at least one host')
  })
})