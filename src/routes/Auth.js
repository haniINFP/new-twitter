import { useState } from "react";
// react 에서 필요한 기능인 useState만 가져오기
import { authService } from "fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,
     signInWithPopup } from "firebase/auth";


const Auth = () => {
    //어떻게 입력을 해야 아이디랑 패스워드로 인정이 될까
    const [email, setEmail] = useState("");
    //앞에는 변수값, 뒤에는 함수
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    //초기화는 useState라는 애로 하겠다.
    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }


    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
            // create newAccount
            data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
            // log in
            data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
     } catch (error) {
        setError(error.message);
     }
        // try cathch문 : 한 번 시도해 보고 문제가 있으면 거기서 잡아서 처리하겠다.
        // async 싱크 맞추는 거, await 결과값 받아올 때까지 로딩 걸리니까 기다려줘라.
    }
    //preventDefault는 기본 동작 되는 걸 막아줌. (submit되는 걸 막음)
    //console.log라는 건 개발자도구에서 함수 안에 있는 텍스트나 객체를 보여주는 친구.
    // event는 객체, 대상, 이름.. 가져와서 console창에 찍어주겠다.
    // submit하게 되면 데이터를 다 넘겨줘야 함. 클릭 했을 때 생기는 event를 실행해 주는 것이 onSubmit

    const toggleAccount = () => setNewAccount((prev)=> !prev);
    //toggleAccount라는 함수를 선언하는 것. 소괄호가 있으면 함수라는뜻. setNewAccount는, 이거를 호출한거임. prev는 이전 값을 의미.
    //!prev는 prev가 아닌 것.T/F 형태임.false면 setNewAccount가 false가 되고..

    //google로그인을 위한 걸 시작! 첫 번 째
    //ppt에는 구글이랑 git두개가 있는데 구글만 파베에 등록해놔서, 일단 2개가 다 있다고 생각하고 button도 2개 만들거임(기능추가는안함)
    // const onSocialClick = (event) => {
    //     console.log(event.target.name);
    // }
    //버튼을 누르면 onsocial을 가져옴..(?)

//////////
    const onSocialClick = async (event) => {
        const {
            target : {name}
        } = event;
        let provider;
        if(name === "google") {
            provider = new GoogleAuthProvider;
        } else if (name === "github") {
            // gitub 일 때 하는 동작
        }

        const data = await signInWithPopup(authService, provider);
        console.log(data);
    }













    return (
        <div>
            <form onSubmit = {onSubmit}>
                <input name = "email" type="email" placeholder="Email" value={email} onChange={onChange} required /> 
                <input name = "password" type="password" placeholder="Password" value={password} onChange={onChange} required />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick ={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick = {onSocialClick} name="google">Continue with Google</button>
                <button onClick = {onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
        //각 버튼이 클릭되면 발생하는 이벤트는 onSocialClick임!
    )
}
export default Auth;