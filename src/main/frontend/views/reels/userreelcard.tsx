

export default function UserReelCard(){
    return(
        <div className='w-[15rem] px-2'>
            <video controls={true} className='w-full h-full'
                   src='https://cdn.pixabay.com/video/2022/03/18/111204-689949818_tiny.mp4'/>
        </div>
    );
}