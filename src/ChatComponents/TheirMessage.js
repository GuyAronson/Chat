export const TheirMessage = props => {
    let time = props.message.timeStamp;
    let type = props.message.type; //for later use - the type of HTML we'll return depends on the type
    let data = props.message.data;
    if (type === "text") {
        return (
            <div className="their_msg">
                {/* <div className="author_name">{author}</div> */}
                <div className="msg_text">{data}</div>
                {/* <div className="msg_timeStamp">{time.getHours()}:{time.getMinutes()}</div> */}
                <div className="msg_timeStamp">{time}</div>
            </div>

        )
    }
}