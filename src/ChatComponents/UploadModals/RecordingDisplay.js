
export const RecordingDisplay = ({record}) => {
    return (
        <div className='m-2'>
            <audio controls src={record}></audio>
        </div>
    );
}