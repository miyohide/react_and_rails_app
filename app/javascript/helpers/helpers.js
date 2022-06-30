// 引数として与えられたオブジェクトが空であるか否か判定
export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

// フォームに入力された値の妥当性検証。問題があればerrorsに値を入れる
export const validateEvent = (event) => {
  const errors = {};

  if (event.type === "") {
    errors.event_type = "You must enter an event type";
  }
  if (event.event_date === "") {
    errors.event_date = "You must enter a valid date";
  }
  if (event.title === "") {
    errors.title = "You must enter a title";
  }
  if (event.speaker === "") {
    errors.speaker = "You must enter at least one speaker";
  }
  if (event.host === "") {
    errors.host = "You must enter at least one host";
  }

  return errors;
};
