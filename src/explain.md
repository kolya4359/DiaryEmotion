# url 파라미터

> /diary:id

```js
// localhost:3000/diary:54
const { id } = useParams();
console.log(id); // 결과: 54
// 이런 식으로 url파라미터 를 조회해서 사용할수 있다.
```

# Query

웹 페이지에 데이터를 전달하는 가장 간단한 방법

> /edit?id=10&mode=dark  
> => Query String

```js
// localhost:3000/edit?id=10&mode=dark
const [searchParams, setSearchParams] = useSearchParams();
// 배열의 searchParams 이름은 바꿔주어도 되는데 useSearchParams() 부분은 바꾸면 안된다.

const id = searchParams.get("id");
console.log("id : ", id); // id : 10

const mode = searchParams.get("mode");
console.log("mode : ", mode); // mode : dark

<button onClick={() => setSearchParams({ who: "winterlood" })}>
  QS바꾸기
</button>;
// QS바꾸기 버튼을 클릭하면 localhost:3000/edit?who=winterlood로 바뀐다.
```

# 페이지 이동

```js
const navigate = useNavigate();

<button
  onClick={() => {
    navigate("/home");
  }}
>
  HOME으로 가기
</button>;
// HOME으로 가기 버튼을 클릭하면
// localhost:3000/home 페이지도 이동한다.
```
