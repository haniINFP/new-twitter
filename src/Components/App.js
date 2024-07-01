import { useEffect, useState } from "react";
import AppRouter from "Components/Router";
import { authService } from "fbase";

function App() {
  const[init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn (user);
        setUserObj (user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  //변화가 일어나면 []공백이라서 한 번 실행된다. 사용자 정보를 가지고 제어를 하겠다.
  //제어를 할 때는 사용자가 객체가 있으면(true)setIsLoggedIn이 로그인 했는지 안 했는지 판단해서 로그인 했으면 true로 바꿔주고
  //로그인 안 됐으면 false로 바꿔줌.
  
  return (
    <>
    {init ? (<AppRouter isLoggedIn= {isLoggedIn} userObj={userObj}/> ): ("initializing...")}
    {/* init은 애초에 false임. 그럼 initializing을 띄워줄거임. approuter로 이동하는 시점은 상태 변화가 일어났을 때.
    랜더가 끝나면 useEffect실행됨->로그인 여부 판단->끝나면 AppRouter가 출력됨 */}
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App;