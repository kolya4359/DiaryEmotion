export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

// toISOString() 메서드는 단순화한 확장 ISO 형식의 문자열을 반환한다.
