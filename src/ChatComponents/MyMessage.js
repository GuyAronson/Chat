export const MyMessage = (message, key) => {
    let author = message.authorID;
    let time = message.timeStamp;
    let type = message.type;
    let data = message.data;
    return (
        <div className="my_msg" key={key}>
            <span className="author_name">{author}</span>
            <span className="msg_text">{data}</span>
            <span className="msg_timeStamp">{time}</span>
        </div>
    )
}   