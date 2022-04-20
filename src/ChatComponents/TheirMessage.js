export const TheirMessage = (message, key) => {
    let author = message.authorID;
    let time = message.timeStamp;
    let type = message.type; //for later use - the type of HTML we'll return depends on the type
    let data = message.data;
    return (
        <div className="their_msg" key={key}>
            <span className="author_name">{author}</span>
            <span className="msg_text">{data}</span>
            <span className="msg_timeStamp">{time}</span>
        </div>

    )
}