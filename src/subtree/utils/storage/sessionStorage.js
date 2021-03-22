// 存储Storage
export function setSessionStorage(response) {
    // 根据信息将将accessToken、refreshToken、过期时间存储
    window.sessionStorage.setItem('Admin-Token', `${response.token_type} ${response.access_token}`);
    window.sessionStorage.setItem('Admin-RefreshToken', response.refresh_token);
    // ! 过期等待, 精准度待确定
    window.sessionStorage.setItem('Admin-ExpiresIn', (response.expires_in * 1000 + new Date().getTime()).toString());
}
