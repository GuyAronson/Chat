export const MyMessage = props => {
    let author = props.message.authorID;
    let time = props.message.timeStamp;
    let type = props.message.type;
    let data = props.message.data;
    
    return (<>
        <div className="my_msg">
            <span className="author_name">{author}</span>
            <span className="msg_text">{data}</span>
            <span className="msg_timeStamp">{time}</span>
        </div>
    </>);
}   