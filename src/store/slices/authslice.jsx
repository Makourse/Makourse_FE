import { createSlice,payloadAction } from "@reduxjs/toolkit";
import { GOOGLE_ID, GOOGLE_SECRET_ID, NAVER_ID, NAVER_SECRET_ID, KAKAO_ID, KAKAO_SECRET_ID } from "./constant.jsx";

const initialState = {
    isLogin: false,
    userInfo: null,
    provider: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        kakaoLogin: ()=>{
            const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
            window.open(link, 'kakaoLogin','width=500, height=600');
        },
        googleLogin: ()=>{
            const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&redirect_uri=${REDIRECT_URI}`;
            window.open(link, 'googleLogin','width=500, height=600');
        },
        naverLogin: ()=>{
            const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_ID}&state=state_parameter_passthrough_value&redirect_uri=${REDIRECT_URI}`;
            window.open(link, 'naverLogin','width=500, height=600');
        },
    },
})

export const { kakaoLogin, googleLogin, naverLogin } = authSlice.actions;
export default authSlice.reducer;