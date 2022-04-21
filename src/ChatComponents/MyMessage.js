export const MyMessage = props => {
    let author = props.message.authorID;
    let time = props.message.timeStamp;
    let type = props.message.type;
    let data = props.message.data;
    
    return (<>
        <div className="my_msg">
            <div className="author_name">{author}</div>
            <div className="msg_text">{data}</div>
            <div className="msg_timeStamp">{time}</div>
        </div>
    </>);
}   