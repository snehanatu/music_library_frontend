class Music {
    _id:string;
    songName: string;
    singerName: string;
    albumName: string;
    trackNumber: string;
    status: string;

    constructor(){
        this.songName = ""
        this.singerName = ""
        this.albumName = ""
        this.trackNumber = ""
        this.status = ""
    }
}

export default Music;