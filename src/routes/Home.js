import { dbService } from "fbase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

const Home = () => {
    const[nweet, setNweet] = useState("");
    //빈 값으로 초기화 해주기
    const onSubmit = (event) => {
        event.preventDefault();
    };
    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value},
                } = event;
            setNweet(value);
            }
    
    
    return (
        <form>
            <input
            type="text"
            placeholder="What's on your mind?"
            maxLength = {120}
            onChange = {onChange}
            value = {nweet}
            />
            <input type="submit" value="Nweet"
            />
            </form>
)}

export default Home;