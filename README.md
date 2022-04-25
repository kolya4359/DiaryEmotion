# 한입 크기로 잘라먹는 리액트 /이정환 강사님

## 기술

- **Function Component**형식으로 제작하여 **Hook**을 사용하여 데이터 조작.
- **Router** 를 이용하여 싱글페이지 어플리케이션으로 만듬.
- **Context**를 사용하여 데이터를 전달.
- **Database**로 **Web LocalStorage** 사용.
- index.html 파일에서 favicon 설정 및 meta 태그로 썸네일 디자인.
- google font를 사용, 반응형 웹 디자인으로 제작.  
<hr />

## Main 화면
## (Home.js / DiaryList.js / DiaryItem.js)

![main1](https://user-images.githubusercontent.com/79749251/148889916-b1a61730-1063-44e4-9ea8-ea81c82fc219.png)

- ControlMenu 함수를 만들고 value, onChange, optionList 를 props로 받습니다.  

- optionList는 객체를 배열에 담아 idx를 키값으로 불러오고, value를 받고, name을 표시합니다.  
첫번째 ControlMenu에서 sortType에 따라 최신순 / 오래된순 을 출력합니다.  
두번째 ControlMenu에서 filter에 따라 모두다 / 좋은 감정 / 나쁜 감정 을 출력합니다.

- ControlMenu 함수가 있는 DiaryList.js 는 Home.js의 자식컴포넌트이기 때문에 Home.js 의 state가 변경될 때마다 불필요하게 리랜더링이 되었습니다. 최적화를 위해 ControlMenu 함수를 React.memo 로 감싸서 ControlMenu 함수의 state 가 변경되지 않으면 리랜더링 되지 않습니다.

![main_2](https://user-images.githubusercontent.com/79749251/148907776-d7b1dd5f-1a74-4ac3-96ea-fa8bd504eb3a.png)

- getProcessedDiaryList 함수를 만들어 카테고리의 선택에 따라 일기가 정렬되도록 하였습니다.
- DiaryList 는 props 로 diaryList 를 compare 함수의 파라미터 a, b 로 전달합니다.  
- compare함수는 (next, prev) 를 파라미터로 받기 때문에 a 가 next, b가 prev가 된다. sortType이 "latest" 이면 b에 담긴 date에서 a에 담긴 date를 빼고, 다음값이 이전 값보다 크면 음수가 되고 위치가 바뀌어 큰 값이 앞으로 오기 때문에 내림차순으로 정렬이 된다.  
- (시간이 최신에 가까울수록 수가 크기 때문에 내림차순으로 정렬이 되면 최신 순으로 정렬이 된다.)
- 그 외에는 a.date - b.date 를 하여 오름차순으로 정렬을 하여 오랜된 순으로 정렬이 된다.
- 이렇게 정렬이 된 diaryList를 JSON 문자열로 변환한 후, JSON 객체로 변환해서 copyList 에 담습니다.
- filteredList 에서는 filter 의 value 가 all 일 경우 copyList 를 반환하고, all 이 아닐 경우 filterCallBack 함수를 호출합니다.
- filterCallBack 함수는 filter 가 good 일 경우 파라미터로 전달된 item 의 감정값이 3보다 작거나 같은 item을 반환하고 그렇지 않은 경우 3 보다 큰 item 을 반환합니다.  
- (감정값은 1 이 제일 좋은 감정, 5가 제일 안 좋은 감정으로 하였습니다.)
- 그 후, filteredList 를 정렬하여 sortedList 에 담아 getProcessedDiaryList 함수의 반환값으로 반환하였습니다.

<hr />

## 새 일기 쓰기 / 일기 수정하기  
## (New.js / Edit.js / DiaryEdit.js / EmotionItem.js)

![Edit](https://user-images.githubusercontent.com/79749251/148912869-1dc5c830-f4c9-449f-8a01-3fbcdfe89527.png)

- 새 일기쓰기 페이지는 App.js 만든 **onCreate 함수**를 **DiaryDispatchContext** 로 전달 받아 사용합니다.  
- **EmotionItem Component**를 만들어 감정표현 아이콘 따로 관리하도록 하고, 디자인 했습니다.  
- 오늘의 일기 부분은 **textarea태그**로 구현하였고, 입력값이 없이 작성완료 버튼을 눌렀을 때, 데이터 저장이 되지 않고 다시 focusing 되도록 하였습니다.
- **작성완료 버튼을 누르면 onCreate함수가 호출**되어 데이터를 저장하고 Home 으로 돌아가도록 하였습니다.
  
- **useParams** 를 이용하여 Route path 에 있는 id 값을 가져옵니다.
- App.js 에서 **DiaryStateContext** 를 통해 diaryList 를 불러오고, find 함수를 사용해 id를 비교하여 useParams와 같은 id를 가진 diaryList 를 가져옵니다.
- 또한, 삭제하고 수정하기 위해서 **DiaryDispatchContext** 로 **onRemove함수**와 **onEdit함수**를 받았습니다.
- Home 에서 수정하기 버튼을 누르면 **isEdit 이 true 로 일기쓰기 Component 인 DiaryEditor Component 로 전달**됩니다.  
- **DiaryEditor** 에 isEdit 이 true 로 전달되면 **headText 가 일기 수정하기로 바뀌고, 삭제하기 버튼이 표시**됩니다.  
- **삭제하기 버튼을 클릭하면 onRemove 함수가 호출**되어 Database 에서 **해당 id를 가진 diaryList 가 삭제**되고, Home 화면에서 사라집니다.  
- 날짜와 감정과 일기 내용을 변경하고 **작성완료 버튼을 누르면 onEdit 함수가 호출**되어 변경된 data 가 저장됩니다.

<hr />

## 상세 페이지
## (Diary.js)

![상세페이지](https://user-images.githubusercontent.com/79749251/148963029-f13134a7-f78b-446a-8b02-7fffbe9ee262.png)

- **useParams** 를 이용하여 Route path 에 있는 id 값을 가져옵니다.
- App.js 에서 **DiaryStateContext** 를 통해 diaryList 를 불러오고, find 함수를 사용해 id를 비교하여 useParams와 같은 id를 가진 diaryList 를 가져옵니다.
- **useNavigate 훅**을 이용하여 뒤로가기 버튼을 눌렀을 땐 뒤로 가게 했고, 수정하기 버튼을 눌렀을 땐 `/edit/${data.id}` 를 통해 해당 id를 가진 수정페이지로 가게 했습니다.

<hr />

## Database
## Web Storage 사용

![데이터베이스](https://user-images.githubusercontent.com/79749251/148968853-0d251296-cbb9-4cdf-ae1d-4a09278c26de.png)

- 데이터베이스로 **Local Storage**를 사용하여 데이터를 간단하게 저장하였습니다.
- App.js 에서 사용한 **상태관리 함수인 Reducer**에서 newState 가 변경될 때마다 localStorage에 직렬화 하여 저장되도록 하였습니다.
