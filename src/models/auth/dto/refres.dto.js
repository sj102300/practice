
export class RefreshDTO{
    accessToken;
    refreshToken;

    constructor(props){
        this.accessToken = props.accessToken;
        this.refreshToken = props.refreshToken;
    }
}