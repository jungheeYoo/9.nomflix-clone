// function Home() {
//   return (
//     <div style={{ backgroundColor: 'whitesmoke', height: '200vh' }}>Home</div>
//   );
// }

// export default Home;

// // ------------------------------------------------------------- //
// // 9-5
// // Home Screen part One
// // 홈 화면 만들기

// import { useQuery } from 'react-query';
// import { getMovies } from '../api';

// // useQuery Hook 은 fetcher 를 사용해서 data 랑 아직 로딩중인지에 대한 알림을 전해준다
// function Home() {
//   const { data, isLoading } = useQuery(['movies', 'nowPlaying'], getMovies);
//   console.log(data, isLoading);

//   return (
//     <div style={{ backgroundColor: 'whitesmoke', height: '200vh' }}>Home</div>
//   );
// }

// export default Home;

// useQuery(); 에 기본적으로 키를 제공해줘야 함
// 문자열이 될 수도 있고, 배열이 될 수도 있음
// ['movies', 'nowPlaying'] 이 안에 있는 것은 식별자에 불과

// TheMovieDB Image가져오기
// 이미지 파일명 앞에 https://image.tmdb.org/t/p/original/ 붙이기

// ------------------------------------------------------------- //
// 9-6
// Home Screen part Two
//

import { useQuery } from 'react-query';
import { getMovies, IGetMoviesResult } from '../api';
import styled from 'styled-components';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto}); // 두 개의 배경 rgba, 이미지
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 36px;
  width: 50%;
`;

// useQuery Hook 은 fetcher 를 사용해서 data 랑 아직 로딩중인지에 대한 알림을 전해준다
function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMovies
  );
  console.log(data, isLoading);

  // Cannot read properties of undefined (reading '0')
  // TypeError: Cannot read properties of undefined (reading '0')
  // const hasMovies = data && data.results && data.results.length > 0;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        // hasMovies && (
        <>
          {/* 배경 이미지를 Banner 컴포넌트(bgPhoto)에 넘김 */}
          {/* bgPhoto 는 만들어진 utils에서 이미 경로여야함 */}
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
        // )
      )}
    </Wrapper>
  );
}

export default Home;

// 타입스크립트에게 useQuery 의 결과가 IGetMovieResult 타입이라고 알려줌
// 그럼 타입스크립트는 data 안에 어떤 것들이 필요한지를 알고 있게 됨
