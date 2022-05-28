import React from "react";
import { displayTime } from "../../../../util";

export const MyMessage = props => {
    let time = displayTime(props.message.Time);
    let author = props.message.Author;
    let type = props.message.Type;
    let data = props.message.Data;
    if (type === "text") {
        return (<>
            <div className="my_msg">
                <div className="author_name">{author}</div>
                <div className="msg_text">{data}</div>
                {/* <div className="msg_timeStamp">{time.getHours()}:{time.getMinutes()}</div> */}
                <div className="msg_timeStamp">{time}</div>
            </div>
        </>);
    }

    if (type === "image") {
        return (
            <>
                <div className="my_msg">
                    <img src={data} className="msg_img" alt="null"/>
                    <div className="msg_timeStamp">{time}</div>
                </div>
            </>
        )
    }

    if (type === "video") {
        return (
            <div className="my_msg">
                <video src={data} className="msg_vid" controls/>
                <div className="msg_timeStamp">{time}</div>
            </div>
        )
    }
    
    if (type === "audio") {
        return (
            <div className="my_msg">
                <audio controls src={data} className="msg_record"></audio>
                <div className="msg_timeStamp">{time}</div>
            </div>
        )
    }
}   