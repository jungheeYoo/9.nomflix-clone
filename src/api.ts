// ------------------------------------------------------------- //
// 9-5
// Home Screen part One
// 홈 화면 만들기

const API_KEY = '0a06d67ddbfb0da39994d1abc5bc457a';
const BASE_PATH = 'https://api.themoviedb.org/3/';

// fetcher 함수 만들기
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

// api.ts 파일 만들어서
// API_KEY 만들기

// https://api.themoviedb.org/3/movie/now_playing?api_key=0a06d67ddbfb0da39994d1abc5bc457a&language=en-US&page=1&region=kr
// URL로 요청 보내기
// URL을 가져올 도구 만들기. 영화 목록 가져오는 도구

// TheMovieDB API Key
// https://www.themoviedb.org/settings/api?language=ko

// TheMovieDB API Document
// https://developers.themoviedb.org/3/movies/get-now-playing
