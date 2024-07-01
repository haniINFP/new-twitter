import { authService } from "fbase";
//authService에 로그아웃 하는 기능이 있어서 불러옴
import { useNavigate } from "react-router-dom";
// useNavigate는 페이지 이동해주는 역할 해주는 친구임
const Profile = ()=> {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
        //로그아웃 하면서 /의 경로로 navigate 시켜줌
    }
    return (
        <>
            <button onClick = {onLogOutClick}>Log Out</button>
        </>
    )
}
export default Profile;