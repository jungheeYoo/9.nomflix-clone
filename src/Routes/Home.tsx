// function Home() {
//   return (
//     <div style={{ backgroundColor: 'whitesmoke', height: '200vh' }}>Home</div>
//   );
// }

// export default Home;

// ------------------------------------------------------------- //
// 9-5
// Home Screen part One
// 홈 화면 만들기

import { useQuery } from 'react-query';
import { getMovies } from '../api';

// useQuery Hook 은 fetcher 를 사용해서 data 랑 아직 로딩중인지에 대한 알림을 전해준다
function Home() {
  const { data, isLoading } = useQuery(['movies', 'nowPlaying'], getMovies);
  console.log(data, isLoading);

  return (
    <div style={{ backgroundColor: 'whitesmoke', height: '200vh' }}>Home</div>
  );
}

export default Home;

// useQuery(); 에 기본적으로 키를 제공해줘야 함
// 문자열이 될 수도 있고, 배열이 될 수도 있음
// ['movies', 'nowPlaying'] 이 안에 있는 것은 식별자에 불과

// TheMovieDB Image가져오기
// 이미지 파일명 앞에 https://image.tmdb.org/t/p/original/ 붙이기
