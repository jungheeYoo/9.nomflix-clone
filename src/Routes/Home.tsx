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

// // ------------------------------------------------------------- //
// // 9-6
// // Home Screen part Two
// // 홈 배경 이미지 완성하기

// import { useQuery } from 'react-query';
// import { getMovies, IGetMoviesResult } from '../api';
// import styled from 'styled-components';
// import { makeImagePath } from '../utils';

// const Wrapper = styled.div`
//   background: black;
// `;

// const Loader = styled.div`
//   height: 20vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Banner = styled.div<{ bgPhoto: string }>`
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 60px;
//   background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
//     url(${(props) => props.bgPhoto}); // 두 개의 배경 rgba, 이미지
//   background-size: cover;
// `;
// const Title = styled.h2`
//   font-size: 68px;
//   margin-bottom: 20px;
// `;

// const Overview = styled.p`
//   font-size: 36px;
//   width: 50%;
// `;

// // useQuery Hook 은 fetcher 를 사용해서 data 랑 아직 로딩중인지에 대한 알림을 전해준다
// function Home() {
//   const { data, isLoading } = useQuery<IGetMoviesResult>(
//     ['movies', 'nowPlaying'],
//     getMovies
//   );
//   console.log(data, isLoading);

//   // Cannot read properties of undefined (reading '0')
//   // TypeError: Cannot read properties of undefined (reading '0')
//   // const hasMovies = data && data.results && data.results.length > 0;

//   return (
//     <Wrapper>
//       {isLoading ? (
//         <Loader>Loading...</Loader>
//       ) : (
//         // hasMovies && (
//         <>
//           {/* 배경 이미지를 Banner 컴포넌트(bgPhoto)에 넘김 */}
//           {/* bgPhoto 는 만들어진 utils에서 이미 경로여야함 */}
//           <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}>
//             <Title>{data?.results[0].title}</Title>
//             <Overview>{data?.results[0].overview}</Overview>
//           </Banner>
//         </>
//         // )
//       )}
//     </Wrapper>
//   );
// }

// export default Home;

// // 타입스크립트에게 useQuery 의 결과가 IGetMovieResult 타입이라고 알려줌
// // 그럼 타입스크립트는 data 안에 어떤 것들이 필요한지를 알고 있게 됨

// // ------------------------------------------------------------- //
// // 9-7
// // Slider part One
// // 슬라이더 만들기

// import { useQuery } from 'react-query';
// import styled from 'styled-components';
// import { motion, AnimatePresence } from 'framer-motion';
// import { getMovies, IGetMoviesResult } from '../api';
// import { makeImagePath } from '../utils';
// import { useState } from 'react';

// const Wrapper = styled.div`
//   background: black;
//   overflow-x: hidden;
// `;

// const Loader = styled.div`
//   height: 20vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Banner = styled.div<{ bgPhoto: string }>`
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 60px;
//   background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
//     url(${(props) => props.bgPhoto}); // 두 개의 배경 rgba, 이미지
//   background-size: cover;
// `;
// const Title = styled.h2`
//   font-size: 68px;
//   margin-bottom: 20px;
// `;

// const Overview = styled.p`
//   font-size: 36px;
//   width: 50%;
// `;

// const Slider = styled.div`
//   position: relative;
//   top: -100px;
// `;

// const Row = styled(motion.div)`
//   display: grid;
//   gap: 10px;
//   grid-template-columns: repeat(6, 1fr);
//   position: absolute;
//   width: 100%;
// `;

// const Box = styled(motion.div)`
//   background-color: white;
//   height: 200px;
//   color: red;
//   font-size: 66px;
// `;

// const rowVariants = {
//   hidden: {
//     x: window.outerWidth, // 사용자 화면의 크기 받아오기
//   }, // 보이지 않을 때
//   visible: {
//     x: 0,
//   }, // 보일 때
//   exit: {
//     x: -window.outerWidth,
//   }, // 사라질 때
// };

// // useQuery Hook 은 fetcher 를 사용해서 data 랑 아직 로딩중인지에 대한 알림을 전해준다
// function Home() {
//   const { data, isLoading } = useQuery<IGetMoviesResult>(
//     ['movies', 'nowPlaying'],
//     getMovies
//   );
//   console.log(data, isLoading);

//   // 인덱스 시스템 만들기
//   const [index, setIndex] = useState(0);
//   // index를 증가시키는 함수
//   // 전 index 를 1만큼 증가시키는 역할
//   const increaseIndex = () => setIndex((prev) => prev + 1);
//   return (
//     <Wrapper>
//       {isLoading ? (
//         <Loader>Loading...</Loader>
//       ) : (
//         <>
//           {/* 배경 이미지를 Banner 컴포넌트(bgPhoto)에 넘김 */}
//           {/* bgPhoto 는 만들어진 utils에서 이미 경로여야함 */}
//           <Banner
//             onClick={increaseIndex}
//             bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
//           >
//             <Title>{data?.results[0].title}</Title>
//             <Overview>{data?.results[0].overview}</Overview>
//           </Banner>
//           <Slider>
//             <AnimatePresence>
//               <Row
//                 variants={rowVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 transition={{ type: 'tween', duration: 1 }}
//                 key={index}
//               >
//                 {/* <Box />
//                 <Box />
//                 <Box />
//                 <Box />
//                 <Box />
//                 <Box /> */}
//                 {[1, 2, 3, 4, 5, 6].map((i) => (
//                   <Box key={i}>{i}</Box>
//                 ))}
//               </Row>
//             </AnimatePresence>
//           </Slider>
//         </>
//       )}
//     </Wrapper>
//   );
// }

// export default Home;

// // 세 개의 열, 슬라이드 6개씩
// // 첫 번째부터 여섯번째 영화까지만 보이게 함
// // motion을 사용할 때는 모든 것을 한 번에 render 할 필요 없음
// // 대신 key들만 바꾸면 됨
// // 하나의 element만 render 하고 key를 바꾸면, react는 새로운 요소가 들어왔다고 생각
// // AnimatePresence import
// // AnimatePresence 는 컴포넌트가 render 되거나 destroy 될 때 효과 줄 수 있음
// // Row를 AnimatePresence 로 감쌈
// // index 시스템 만들기
// // index를 Row의 key로 넘겨줌
// // key가 변경되면, react는 새로운 Row가 만들어졌다고 생각
// // 그리고 react가 새 Row를 생성햐려고 할 때, 원래 있던 Row는 파괴 됨
// // 원래의 Row 가 파괴될 때, exit="exit" 실행
// // 새로운 Row 가 만들어지니까, initial="hidden" 시작해서 animate="visible" 실행됨
// // 그래서 Row를 세 개씩이나 render 하지 않아도 되는 것
// // 단 하나의 Row만 render 하고, key만 바꿔서 여러 Row가 서로의 옆에 붙어있는 것 같은 효과를 줄 수 있음

// // ------------------------------------------------------------- //
// // 9-8
// // Slider part Two
// // 슬라이더 만들기

// import { useQuery } from 'react-query';
// import styled from 'styled-components';
// import { motion, AnimatePresence } from 'framer-motion';
// import { getMovies, IGetMoviesResult } from '../api';
// import { makeImagePath } from '../utils';
// import { useState } from 'react';

// const Wrapper = styled.div`
//   background: black;
//   overflow-x: hidden;
// `;

// const Loader = styled.div`
//   height: 20vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Banner = styled.div<{ $bgPhoto: string }>`
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 60px;
//   background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
//     url(${(props) => props.$bgPhoto}); // 두 개의 배경 rgba, 이미지
//   background-size: cover;
// `;

// const Title = styled.h2`
//   font-size: 68px;
//   margin-bottom: 20px;
// `;

// const Overview = styled.p`
//   font-size: 30px;
//   width: 50%;
// `;

// const Slider = styled.div`
//   position: relative;
//   top: -100px;
// `;

// const Row = styled(motion.div)`
//   display: grid;
//   gap: 5px;
//   grid-template-columns: repeat(6, 1fr);
//   position: absolute;
//   width: 100%;
// `;

// // () 다음에 넣어주면 됨 <{ $bgPhoto: string }>
// const Box = styled(motion.div)<{ $bgPhoto: string }>`
//   background-color: white;
//   background-image: url(${(props) => props.$bgPhoto});
//   background-size: cover;
//   background-position: center center;
//   height: 200px;
//   color: red;
//   font-size: 66px;
// `;

// const rowVariants = {
//   hidden: {
//     x: window.outerWidth + 5, // 사용자 화면의 크기 받아오기
//   }, // 보이지 않을 때
//   visible: {
//     x: 0,
//   }, // 보일 때
//   exit: {
//     x: -window.outerWidth - 5,
//   }, // 사라질 때
// };

// // 한 번에 보여주고 싶은 영화의 수
// const offset = 6;

// // useQuery Hook 은 fetcher 를 사용해서 data 랑 아직 로딩중인지에 대한 알림을 전해준다
// function Home() {
//   const { data, isLoading } = useQuery<IGetMoviesResult>(
//     ['movies', 'nowPlaying'],
//     getMovies
//   );
//   // console.log(data, isLoading);

//   // 인덱스 시스템 만들기
//   const [index, setIndex] = useState(0);
//   // index를 증가시키는 함수
//   // 전 index 를 1만큼 증가시키는 역할
//   const [leaving, setLeaving] = useState(false);
//   const increaseIndex = () => {
//     if (data) {
//       if (leaving) return;
//       toggleLeaving();
//       // totalMovies 정의
//       // totalMovies는 영화의 총 개수에서 하나를 뺀 값
//       const totalMovies = data?.results.length - 1;
//       // 갯수가 4.2 이런식으로 될수도 있으니 올림 처리 해줌
//       // 영화 하나가 남아서 floor로 바꿈 하나 적게
//       // page가 0에서 시작하기 때문에, maxIndex도 1 감소시킴
//       const maxIndex = Math.floor(totalMovies / offset) - 1;
//       // 증가시키려고 하는 index가 이미 maxIndex라면, 0으로 되돌리고
//       // 그렇지 않으면 증가
//       setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
//     }
//   };
//   // leaving 을 반전시키는 역할
//   const toggleLeaving = () => setLeaving((prev) => !prev);
//   return (
//     <Wrapper>
//       {isLoading ? (
//         <Loader>Loading...</Loader>
//       ) : (
//         <>
//           {/* 배경 이미지를 Banner 컴포넌트(bgPhoto)에 넘김 */}
//           {/* bgPhoto 는 만들어진 utils에서 이미 경로여야함 */}
//           {/* bgPhoto 대문자 에러때문에 $붙임 */}
//           <Banner
//             onClick={increaseIndex}
//             $bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
//           >
//             <Title>{data?.results[0].title}</Title>
//             <Overview>{data?.results[0].overview}</Overview>
//           </Banner>
//           <Slider>
//             <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
//               <Row
//                 variants={rowVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 transition={{ type: 'tween', duration: 1 }}
//                 key={index}
//               >
//                 {/* <Box />
//                 <Box />
//                 <Box />
//                 <Box />
//                 <Box />
//                 <Box /> */}
//                 {/* 이미 배경으로 사용한 영화는 제외 */}
//                 {data?.results
//                   .slice(1)
//                   .slice(offset * index, offset * index + offset)
//                   .map((movie) => (
//                     <Box
//                       key={movie.id}
//                       $bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
//                     />
//                   ))}
//               </Row>
//             </AnimatePresence>
//           </Slider>
//         </>
//       )}
//     </Wrapper>
//   );
// }

// export default Home;

// // 슬라이드를 빠르게 클릭하면 간격이 생기는 버그 해결
// // state 만듦
// // increaseIndex 수정
// // leaving 이 true면, return 하고 아무것도 안함
// // 만약 false면, 원래대로 작동 setIndex((prev) => prev + 1)
// // setLeaving(true) 로 바꾸고
// // 사용자가 한 번 더 클릭하면, leaving 은 true 인 상태
// // 처음 클릭할 때는 leaving이 false이지만
// // leaving을 true로 바꾼 다음 index를 증가시킴
// // 그러면 transition이 시작되는데
// // 그때 한 번 더 클릭하면 leaving 이 true 일테니 아무것도 일어나지 않음
// // <AnimatePresence onExitComplete={}>
// // onExitComplete prop
// // onExitComplete 에 함수를 넣으면 exit이 끝났을 때 실행 됨
// // if절에서 toggleLeaving 을 호출하면 leaving은 true가 될거고
// // exit이 끝났을 때 toggleLeaving을 호출하면 leaving이 false가 될 것임

// // Home을 클릭하면, movie들이 미끄러져 들어오는 문제
// // 왜냐면 state가 hidden인 상태로 시작해서임
// // initial={false} prop 사용
// // 새로고침해도 제자리에서 시작

// // 박스에 이미지 담기
// // 영화가 총19개 그 중 하나는 배경에 쓰고 18개면 6개씩 3개의 페이지 필요
// // const offset = 6; 한 번에 보여주고 싶은 영화 수 만들고
// // index가 0일 때, 가장 처음에는 첫 여섯 영화가 담긴 배열을 줄 것임

// // ------------------------------------------------------------- //
// // 9-9
// // Box Animations part One
// // Box에 애니메이션 효과 주기

// import { useQuery } from 'react-query';
// import styled from 'styled-components';
// import { motion, AnimatePresence } from 'framer-motion';
// import { getMovies, IGetMoviesResult } from '../api';
// import { makeImagePath } from '../utils';
// import { useState } from 'react';

// const Wrapper = styled.div`
//   background: black;
//   padding-bottom: 200px;
//   overflow-x: hidden;
// `;

// const Loader = styled.div`
//   height: 20vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Banner = styled.div<{ $bgPhoto: string }>`
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 60px;
//   background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
//     url(${(props) => props.$bgPhoto}); // 두 개의 배경 rgba, 이미지
//   background-size: cover;
// `;

// const Title = styled.h2`
//   font-size: 68px;
//   margin-bottom: 20px;
// `;

// const Overview = styled.p`
//   font-size: 30px;
//   width: 50%;
// `;

// const Slider = styled.div`
//   position: relative;
//   top: -100px;
// `;

// const Row = styled(motion.div)`
//   display: grid;
//   gap: 5px;
//   grid-template-columns: repeat(6, 1fr);
//   position: absolute;
//   width: 100%;
// `;

// // () 다음에 넣어주면 됨 <{ $bgPhoto: string }>
// const Box = styled(motion.div)<{ $bgPhoto: string }>`
//   background-color: white;
//   background-image: url(${(props) => props.$bgPhoto});
//   background-size: cover;
//   background-position: center center;
//   height: 200px;
//   color: red;
//   font-size: 66px;
//   &:first-child {
//     transform-origin: center left;
//   }
//   &:last-child {
//     transform-origin: center right;
//   }
// `;

// const rowVariants = {
//   hidden: {
//     x: window.outerWidth + 5, // 사용자 화면의 크기 받아오기
//   }, // 보이지 않을 때
//   visible: {
//     x: 0,
//   }, // 보일 때
//   exit: {
//     x: -window.outerWidth - 5,
//   }, // 사라질 때
// };

// const boxVariants = {
//   normal: {
//     scale: 1,
//   },
//   hover: {
//     scale: 1.3,
//     y: -50,
//     transition: {
//       delay: 0.5,
//       duration: 0.1,
//       type: 'tween',
//     },
//   },
// };

// // 한 번에 보여주고 싶은 영화의 수
// const offset = 6;

// // useQuery Hook 은 fetcher 를 사용해서 data 랑 아직 로딩중인지에 대한 알림을 전해준다
// function Home() {
//   const { data, isLoading } = useQuery<IGetMoviesResult>(
//     ['movies', 'nowPlaying'],
//     getMovies
//   );
//   // console.log(data, isLoading);

//   // 인덱스 시스템 만들기
//   const [index, setIndex] = useState(0);
//   // index를 증가시키는 함수
//   // 전 index 를 1만큼 증가시키는 역할
//   const [leaving, setLeaving] = useState(false);
//   const increaseIndex = () => {
//     if (data) {
//       if (leaving) return;
//       toggleLeaving();
//       // totalMovies 정의
//       // totalMovies는 영화의 총 개수에서 하나를 뺀 값
//       const totalMovies = data?.results.length - 1;
//       // 갯수가 4.2 이런식으로 될수도 있으니 올림 처리 해줌
//       // 영화 하나가 남아서 floor로 바꿈 하나 적게
//       // page가 0에서 시작하기 때문에, maxIndex도 1 감소시킴
//       const maxIndex = Math.floor(totalMovies / offset) - 1;
//       // 증가시키려고 하는 index가 이미 maxIndex라면, 0으로 되돌리고
//       // 그렇지 않으면 증가
//       setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
//     }
//   };
//   // leaving 을 반전시키는 역할
//   const toggleLeaving = () => setLeaving((prev) => !prev);
//   return (
//     <Wrapper>
//       {isLoading ? (
//         <Loader>Loading...</Loader>
//       ) : (
//         <>
//           {/* 배경 이미지를 Banner 컴포넌트(bgPhoto)에 넘김 */}
//           {/* bgPhoto 는 만들어진 utils에서 이미 경로여야함 */}
//           {/* bgPhoto 대문자 에러때문에 $붙임 */}
//           <Banner
//             onClick={increaseIndex}
//             $bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
//           >
//             <Title>{data?.results[0].title}</Title>
//             <Overview>{data?.results[0].overview}</Overview>
//           </Banner>
//           <Slider>
//             <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
//               <Row
//                 variants={rowVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 transition={{ type: 'tween', duration: 1 }}
//                 key={index}
//               >
//                 {/* <Box />
//                 <Box />
//                 <Box />
//                 <Box />
//                 <Box />
//                 <Box /> */}
//                 {/* 이미 배경으로 사용한 영화는 제외 */}
//                 {data?.results
//                   .slice(1)
//                   .slice(offset * index, offset * index + offset)
//                   .map((movie) => (
//                     <Box
//                       key={movie.id}
//                       whileHover="hover"
//                       initial="nomal"
//                       variants={boxVariants}
//                       transition={{ type: 'tween' }}
//                       $bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
//                     />
//                   ))}
//               </Row>
//             </AnimatePresence>
//           </Slider>
//         </>
//       )}
//     </Wrapper>
//   );
// }

// export default Home;

// // Box 에 마우스 오버 효과 줌

// // ------------------------------------------------------------- //
// // 9-10
// // Box Animations part Two
// // Box info에 애니메이션 효과 주기

// import { useQuery } from 'react-query';
// import styled from 'styled-components';
// import { motion, AnimatePresence } from 'framer-motion';
// import { getMovies, IGetMoviesResult } from '../api';
// import { makeImagePath } from '../utils';
// import { useState } from 'react';

// const Wrapper = styled.div`
//   background: black;
//   padding-bottom: 200px;
//   overflow-x: hidden;
// `;

// const Loader = styled.div`
//   height: 20vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Banner = styled.div<{ $bgPhoto: string }>`
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 60px;
//   background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
//     url(${(props) => props.$bgPhoto}); // 두 개의 배경 rgba, 이미지
//   background-size: cover;
// `;

// const Title = styled.h2`
//   font-size: 68px;
//   margin-bottom: 20px;
// `;

// const Overview = styled.p`
//   font-size: 30px;
//   width: 50%;
// `;

// const Slider = styled.div`
//   position: relative;
//   top: -100px;
// `;

// const Row = styled(motion.div)`
//   display: grid;
//   gap: 5px;
//   grid-template-columns: repeat(6, 1fr);
//   position: absolute;
//   width: 100%;
// `;

// // () 다음에 넣어주면 됨 <{ $bgPhoto: string }>
// const Box = styled(motion.div)<{ $bgPhoto: string }>`
//   background-color: white;
//   background-image: url(${(props) => props.$bgPhoto});
//   background-size: cover;
//   background-position: center center;
//   height: 200px;
//   font-size: 66px;
//   &:first-child {
//     transform-origin: center left;
//   }
//   &:last-child {
//     transform-origin: center right;
//   }
// `;

// const Info = styled(motion.div)`
//   padding: 10px;
//   background-color: ${(props) => props.theme.black.lighter};
//   opacity: 0;
//   position: absolute;
//   width: 100%;
//   bottom: 0;
//   h4 {
//     text-align: center;
//     font-size: 18px;
//   }
// `;

// const rowVariants = {
//   hidden: {
//     x: window.outerWidth + 5, // 사용자 화면의 크기 받아오기
//   }, // 보이지 않을 때
//   visible: {
//     x: 0,
//   }, // 보일 때
//   exit: {
//     x: -window.outerWidth - 5,
//   }, // 사라질 때
// };

// const boxVariants = {
//   normal: {
//     scale: 1,
//   },
//   hover: {
//     scale: 1.3,
//     y: -50,
//     transition: {
//       delay: 0.5,
//       duration: 0.1,
//       type: 'tween',
//     },
//   },
// };

// const infoVariants = {
//   hover: {
//     opacity: 1,
//     transition: {
//       delay: 0.5,
//       duration: 0.1,
//       type: 'tween',
//     },
//   },
// };

// // 한 번에 보여주고 싶은 영화의 수
// const offset = 6;

// // useQuery Hook 은 fetcher 를 사용해서 data 랑 아직 로딩중인지에 대한 알림을 전해준다
// function Home() {
//   const { data, isLoading } = useQuery<IGetMoviesResult>(
//     ['movies', 'nowPlaying'],
//     getMovies
//   );
//   // console.log(data, isLoading);

//   // 인덱스 시스템 만들기
//   const [index, setIndex] = useState(0);
//   // index를 증가시키는 함수
//   // 전 index 를 1만큼 증가시키는 역할
//   const [leaving, setLeaving] = useState(false);
//   const increaseIndex = () => {
//     if (data) {
//       if (leaving) return;
//       toggleLeaving();
//       // totalMovies 정의
//       // totalMovies는 영화의 총 개수에서 하나를 뺀 값
//       const totalMovies = data?.results.length - 1;
//       // 갯수가 4.2 이런식으로 될수도 있으니 올림 처리 해줌
//       // 영화 하나가 남아서 floor로 바꿈 하나 적게
//       // page가 0에서 시작하기 때문에, maxIndex도 1 감소시킴
//       const maxIndex = Math.floor(totalMovies / offset) - 1;
//       // 증가시키려고 하는 index가 이미 maxIndex라면, 0으로 되돌리고
//       // 그렇지 않으면 증가
//       setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
//     }
//   };
//   // leaving 을 반전시키는 역할
//   const toggleLeaving = () => setLeaving((prev) => !prev);
//   return (
//     <Wrapper>
//       {isLoading ? (
//         <Loader>Loading...</Loader>
//       ) : (
//         <>
//           {/* 배경 이미지를 Banner 컴포넌트(bgPhoto)에 넘김 */}
//           {/* bgPhoto 는 만들어진 utils에서 이미 경로여야함 */}
//           {/* bgPhoto 대문자 에러때문에 $붙임 */}
//           <Banner
//             onClick={increaseIndex}
//             $bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
//           >
//             <Title>{data?.results[0].title}</Title>
//             <Overview>{data?.results[0].overview}</Overview>
//           </Banner>
//           <Slider>
//             <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
//               <Row
//                 variants={rowVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 transition={{ type: 'tween', duration: 1 }}
//                 key={index}
//               >
//                 {/* <Box />
//                 <Box />
//                 <Box />
//                 <Box />
//                 <Box />
//                 <Box /> */}
//                 {/* 이미 배경으로 사용한 영화는 제외 */}
//                 {data?.results
//                   .slice(1)
//                   .slice(offset * index, offset * index + offset)
//                   .map((movie) => (
//                     <Box
//                       key={movie.id}
//                       whileHover="hover"
//                       initial="nomal"
//                       variants={boxVariants}
//                       transition={{ type: 'tween' }}
//                       $bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
//                     >
//                       <Info variants={infoVariants}>
//                         <h4>{movie.title}</h4>
//                       </Info>
//                     </Box>
//                   ))}
//               </Row>
//             </AnimatePresence>
//           </Slider>
//         </>
//       )}
//     </Wrapper>
//   );
// }

// export default Home;

// // Info element에는 부모가 있고, 그 부모가 variants를 갖고 있음
// // 그리고 whileHover 에 variants 의 이름을 넣어준 상태면,
// // 자동적으로 자식에게도 상속 됨
// // whileHover 같은 prop은 자동적으로 자식 element에게 상속 됨
// // 그래서 자식 element에 같은 key를 가진(hover:) variants를 넣어주기만 하면, 똑같이 작동

// // ------------------------------------------------------------- //
// // 9-11
// // Movie Modal
// // Box 클릭했을 때 나오는 애니메이션 구현

// import { useQuery } from 'react-query';
// import styled from 'styled-components';
// import { motion, AnimatePresence } from 'framer-motion';
// import { getMovies, IGetMoviesResult } from '../api';
// import { makeImagePath } from '../utils';
// import { useState } from 'react';
// import { useHistory, useRouteMatch } from 'react-router-dom';

// const Wrapper = styled.div`
//   background: black;
//   padding-bottom: 200px;
//   overflow-x: hidden;
// `;

// const Loader = styled.div`
//   height: 20vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Banner = styled.div<{ $bgPhoto: string }>`
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 60px;
//   background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
//     url(${(props) => props.$bgPhoto}); // 두 개의 배경 rgba, 이미지
//   background-size: cover;
// `;

// const Title = styled.h2`
//   font-size: 68px;
//   margin-bottom: 20px;
// `;

// const Overview = styled.p`
//   font-size: 30px;
//   width: 50%;
// `;

// const Slider = styled.div`
//   position: relative;
//   top: -100px;
// `;

// const Row = styled(motion.div)`
//   display: grid;
//   gap: 5px;
//   grid-template-columns: repeat(6, 1fr);
//   position: absolute;
//   width: 100%;
// `;

// // () 다음에 넣어주면 됨 <{ $bgPhoto: string }>
// const Box = styled(motion.div)<{ $bgPhoto: string }>`
//   background-color: white;
//   background-image: url(${(props) => props.$bgPhoto});
//   background-size: cover;
//   background-position: center center;
//   height: 200px;
//   font-size: 66px;
//   cursor: pointer;
//   &:first-child {
//     transform-origin: center left;
//   }
//   &:last-child {
//     transform-origin: center right;
//   }
// `;

// const Info = styled(motion.div)`
//   padding: 10px;
//   background-color: ${(props) => props.theme.black.lighter};
//   opacity: 0;
//   position: absolute;
//   width: 100%;
//   bottom: 0;
//   h4 {
//     text-align: center;
//     font-size: 18px;
//   }
// `;

// const rowVariants = {
//   hidden: {
//     x: window.outerWidth + 5, // 사용자 화면의 크기 받아오기
//   }, // 보이지 않을 때
//   visible: {
//     x: 0,
//   }, // 보일 때
//   exit: {
//     x: -window.outerWidth - 5,
//   }, // 사라질 때
// };

// const boxVariants = {
//   normal: {
//     scale: 1,
//   },
//   hover: {
//     scale: 1.3,
//     y: -50,
//     transition: {
//       delay: 0.5,
//       duration: 0.1,
//       type: 'tween',
//     },
//   },
// };

// const infoVariants = {
//   hover: {
//     opacity: 1,
//     transition: {
//       delay: 0.5,
//       duration: 0.1,
//       type: 'tween',
//     },
//   },
// };

// // 한 번에 보여주고 싶은 영화의 수
// const offset = 6;

// // useQuery Hook 은 fetcher 를 사용해서 data 랑 아직 로딩중인지에 대한 알림을 전해준다
// function Home() {
//   const history = useHistory();
//   const bigMovieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');
//   // console.log(bigMovieMatch);

//   const { data, isLoading } = useQuery<IGetMoviesResult>(
//     ['movies', 'nowPlaying'],
//     getMovies
//   );
//   // console.log(data, isLoading);

//   // 인덱스 시스템 만들기
//   const [index, setIndex] = useState(0);
//   // index를 증가시키는 함수
//   // 전 index 를 1만큼 증가시키는 역할
//   const [leaving, setLeaving] = useState(false);
//   const increaseIndex = () => {
//     if (data) {
//       if (leaving) return;
//       toggleLeaving();
//       // totalMovies 정의
//       // totalMovies는 영화의 총 개수에서 하나를 뺀 값
//       const totalMovies = data?.results.length - 1;
//       // 갯수가 4.2 이런식으로 될수도 있으니 올림 처리 해줌
//       // 영화 하나가 남아서 floor로 바꿈 하나 적게
//       // page가 0에서 시작하기 때문에, maxIndex도 1 감소시킴
//       const maxIndex = Math.floor(totalMovies / offset) - 1;
//       // 증가시키려고 하는 index가 이미 maxIndex라면, 0으로 되돌리고
//       // 그렇지 않으면 증가
//       setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
//     }
//   };
//   // leaving 을 반전시키는 역할
//   const toggleLeaving = () => setLeaving((prev) => !prev);
//   // Box가 클릭됐을 때 호출 될 함수
//   // 이 함수는 movieId 를 argument(인자)로 받을 것임
//   const onBoxClicked = (movieId: number) => {
//     history.push(`/movies/${movieId}`);
//   };
//   return (
//     <Wrapper>
//       {isLoading ? (
//         <Loader>Loading...</Loader>
//       ) : (
//         <>
//           {/* 배경 이미지를 Banner 컴포넌트(bgPhoto)에 넘김 */}
//           {/* bgPhoto 는 만들어진 utils에서 이미 경로여야함 */}
//           {/* bgPhoto 대문자 에러때문에 $붙임 */}
//           <Banner
//             onClick={increaseIndex}
//             $bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
//           >
//             <Title>{data?.results[0].title}</Title>
//             <Overview>{data?.results[0].overview}</Overview>
//           </Banner>
//           <Slider>
//             <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
//               <Row
//                 variants={rowVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 transition={{ type: 'tween', duration: 1 }}
//                 key={index}
//               >
//                 {/* <Box />
//                 <Box />
//                 <Box />
//                 <Box />
//                 <Box />
//                 <Box /> */}
//                 {/* 이미 배경으로 사용한 영화는 제외 */}
//                 {data?.results
//                   .slice(1)
//                   .slice(offset * index, offset * index + offset)
//                   .map((movie) => (
//                     <Box
//                       // movie.id는 number고, layout는 string이어야 함
//                       // + '' 로 간단하게 string 으로 변환
//                       layoutId={movie.id + ''}
//                       key={movie.id}
//                       whileHover="hover"
//                       initial="nomal"
//                       variants={boxVariants}
//                       // onClick prop에 function을 넣어줄건데
//                       // onBoxClicked function 에 argument를 넘겨야 하니
//                       // 익명함수 사용
//                       onClick={() => onBoxClicked(movie.id)}
//                       transition={{ type: 'tween' }}
//                       $bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
//                     >
//                       <Info variants={infoVariants}>
//                         <h4>{movie.title}</h4>
//                       </Info>
//                     </Box>
//                   ))}
//               </Row>
//             </AnimatePresence>
//           </Slider>
//           <AnimatePresence>
//             {bigMovieMatch ? (
//               <motion.div
//                 layoutId={bigMovieMatch.params.movieId}
//                 style={{
//                   position: 'absolute',
//                   width: '40vw',
//                   height: '80vh',
//                   backgroundColor: 'coral',
//                   top: 50,
//                   left: 0,
//                   right: 0,
//                   margin: '0 auto',
//                 }}
//               ></motion.div>
//             ) : null}
//           </AnimatePresence>
//         </>
//       )}
//     </Wrapper>
//   );
// }

// export default Home;

// // URL 바꿔야 함
// // URL을 바꾸면, 그 변화를 감지하고 URL 에 기반해서 애니메이셔니을 실행시킬 수 있다
// // 넷플릭스 보면 이런 상자를 클릭할 때마다 URL이 바뀐다

// // 일단 어떤 영화를 클릭하고 있는지 알아야함. 내가 클릭하고 있는 영화의 ID
// // URl을 바꾸기 위해서는 history object에 접근해야 함
// // useHistory 훅을 사용하면 URl을 왔다갔다할 수 있다. 여러 route 사이를 움직일 수 있다

// // match는 지금 그 URL에 있는지 아닌지를 판단하는 도구
// // match를 만들기 전에 path='/' 를 배열로 바꿈

// // 다른 컴포넌트에 AnimatePresense 사용
// // 이 컴포넌트는 bigMovieMatch가 존재할 때만 나타날 것임
// // bigMovieMatch 는 내 위치가 이 route와 맞는지를 알려줌
// // 이 route가 이 URL /movies/:movieId 에 위치하면, bigMovieMatch 는 존재할 것이고,
// // 아니면 null
// // bigMovieMatch가 존재한다는 것은, 큰 card를 보여줘야 한다는 의미
// // 이 element는 /movies/519182 이 URL에 있을 때만 보여야 함
// // Home으로 돌아가면, 나타나면 안됨

// // layout Id는 두 개의 다른 div를 연결하고, framer motion이
// // 그 두 div 사이를 애니메이션으로 연결할 수 있도록 해주는 도구

// // ------------------------------------------------------------- //
// // 9-12
// // Movie Modal part Two
// // 오버레이 만들기
// // 사용자가 어디에 있든, 스크롤 된 화면에 맞게 가운데 나오도록 하기

// import { useQuery } from 'react-query';
// import styled from 'styled-components';
// import { motion, AnimatePresence, useScroll } from 'framer-motion';
// import { getMovies, IGetMoviesResult } from '../api';
// import { makeImagePath } from '../utils';
// import { useState } from 'react';
// import { useHistory, useRouteMatch } from 'react-router-dom';

// const Wrapper = styled.div`
//   background: black;
//   padding-bottom: 200px;
//   overflow-x: hidden;
// `;

// const Loader = styled.div`
//   height: 20vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Banner = styled.div<{ $bgPhoto: string }>`
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 60px;
//   background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
//     url(${(props) => props.$bgPhoto}); // 두 개의 배경 rgba, 이미지
//   background-size: cover;
// `;

// const Title = styled.h2`
//   font-size: 68px;
//   margin-bottom: 20px;
// `;

// const Overview = styled.p`
//   font-size: 30px;
//   width: 50%;
// `;

// const Slider = styled.div`
//   position: relative;
//   top: -100px;
// `;

// const Row = styled(motion.div)`
//   display: grid;
//   gap: 5px;
//   grid-template-columns: repeat(6, 1fr);
//   position: absolute;
//   width: 100%;
// `;

// // () 다음에 넣어주면 됨 <{ $bgPhoto: string }>
// const Box = styled(motion.div)<{ $bgPhoto: string }>`
//   background-color: white;
//   background-image: url(${(props) => props.$bgPhoto});
//   background-size: cover;
//   background-position: center center;
//   height: 200px;
//   font-size: 66px;
//   cursor: pointer;
//   &:first-child {
//     transform-origin: center left;
//   }
//   &:last-child {
//     transform-origin: center right;
//   }
// `;

// const Info = styled(motion.div)`
//   padding: 10px;
//   background-color: ${(props) => props.theme.black.lighter};
//   opacity: 0;
//   position: absolute;
//   width: 100%;
//   bottom: 0;
//   h4 {
//     text-align: center;
//     font-size: 18px;
//   }
// `;

// const Overlay = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   opacity: 0;
// `;

// const BigMovie = styled(motion.div)`
//   position: absolute;
//   width: 40vw;
//   height: 80vh;
//   left: 0;
//   right: 0;
//   margin: 0 auto;
// `;

// const rowVariants = {
//   hidden: {
//     x: window.outerWidth + 5, // 사용자 화면의 크기 받아오기
//   }, // 보이지 않을 때
//   visible: {
//     x: 0,
//   }, // 보일 때
//   exit: {
//     x: -window.outerWidth - 5,
//   }, // 사라질 때
// };

// const boxVariants = {
//   normal: {
//     scale: 1,
//   },
//   hover: {
//     scale: 1.3,
//     y: -50,
//     transition: {
//       delay: 0.5,
//       duration: 0.1,
//       type: 'tween',
//     },
//   },
// };

// const infoVariants = {
//   hover: {
//     opacity: 1,
//     transition: {
//       delay: 0.5,
//       duration: 0.1,
//       type: 'tween',
//     },
//   },
// };

// // 한 번에 보여주고 싶은 영화의 수
// const offset = 6;

// // useQuery Hook 은 fetcher 를 사용해서 data 랑 아직 로딩중인지에 대한 알림을 전해준다
// function Home() {
//   const history = useHistory();
//   const bigMovieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');
//   // console.log(bigMovieMatch);
//   const { scrollY } = useScroll();
//   const { data, isLoading } = useQuery<IGetMoviesResult>(
//     ['movies', 'nowPlaying'],
//     getMovies
//   );
//   // console.log(data, isLoading);

//   // 인덱스 시스템 만들기
//   const [index, setIndex] = useState(0);
//   // index를 증가시키는 함수
//   // 전 index 를 1만큼 증가시키는 역할
//   const [leaving, setLeaving] = useState(false);
//   const increaseIndex = () => {
//     if (data) {
//       if (leaving) return;
//       toggleLeaving();
//       // totalMovies 정의
//       // totalMovies는 영화의 총 개수에서 하나를 뺀 값
//       const totalMovies = data?.results.length - 1;
//       // 갯수가 4.2 이런식으로 될수도 있으니 올림 처리 해줌
//       // 영화 하나가 남아서 floor로 바꿈 하나 적게
//       // page가 0에서 시작하기 때문에, maxIndex도 1 감소시킴
//       const maxIndex = Math.floor(totalMovies / offset) - 1;
//       // 증가시키려고 하는 index가 이미 maxIndex라면, 0으로 되돌리고
//       // 그렇지 않으면 증가
//       setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
//     }
//   };
//   // leaving 을 반전시키는 역할
//   const toggleLeaving = () => setLeaving((prev) => !prev);
//   // Box가 클릭됐을 때 호출 될 함수
//   // 이 함수는 movieId 를 argument(인자)로 받을 것임
//   const onBoxClicked = (movieId: number) => {
//     history.push(`/movies/${movieId}`);
//   };
//   const onOverlayClick = () => history.push('/');
//   return (
//     <Wrapper>
//       {isLoading ? (
//         <Loader>Loading...</Loader>
//       ) : (
//         <>
//           {/* 배경 이미지를 Banner 컴포넌트(bgPhoto)에 넘김 */}
//           {/* bgPhoto 는 만들어진 utils에서 이미 경로여야함 */}
//           {/* bgPhoto 대문자 에러때문에 $붙임 */}
//           <Banner
//             onClick={increaseIndex}
//             $bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
//           >
//             <Title>{data?.results[0].title}</Title>
//             <Overview>{data?.results[0].overview}</Overview>
//           </Banner>
//           <Slider>
//             <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
//               <Row
//                 variants={rowVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 transition={{ type: 'tween', duration: 1 }}
//                 key={index}
//               >
//                 {/* <Box />
//                 <Box />
//                 <Box />
//                 <Box />
//                 <Box />
//                 <Box /> */}
//                 {/* 이미 배경으로 사용한 영화는 제외 */}
//                 {data?.results
//                   .slice(1)
//                   .slice(offset * index, offset * index + offset)
//                   .map((movie) => (
//                     <Box
//                       // movie.id는 number고, layout는 string이어야 함
//                       // + '' 로 간단하게 string 으로 변환
//                       layoutId={movie.id + ''}
//                       key={movie.id}
//                       whileHover="hover"
//                       initial="nomal"
//                       variants={boxVariants}
//                       // onClick prop에 function을 넣어줄건데
//                       // onBoxClicked function 에 argument를 넘겨야 하니
//                       // 익명함수 사용
//                       onClick={() => onBoxClicked(movie.id)}
//                       transition={{ type: 'tween' }}
//                       $bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
//                     >
//                       <Info variants={infoVariants}>
//                         <h4>{movie.title}</h4>
//                       </Info>
//                     </Box>
//                   ))}
//               </Row>
//             </AnimatePresence>
//           </Slider>
//           <AnimatePresence>
//             {bigMovieMatch ? (
//               <>
//                 {/* 두 개의 element를 return 할 수 있게 */}
//                 {/* 서로 붙어있는 분리 된 컴포넌트들을 반환 */}
//                 {/* 하나는 모달 창, 하나는 overlay */}
//                 <Overlay
//                   onClick={onOverlayClick}
//                   exit={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 />
//                 <BigMovie
//                   // MotionValue 에 margin 주려면 .get() 씀
//                   style={{ top: scrollY.get() + 100 }}
//                   layoutId={bigMovieMatch.params.movieId}
//                 >
//                   hello
//                 </BigMovie>
//               </>
//             ) : null}
//           </AnimatePresence>
//         </>
//       )}
//     </Wrapper>
//   );
// }

// export default Home;

// // 오버레이 만들기
// // 모달 창 뒤에서 클릭을 감지할 수 있는 오버레이
// // 모달 창 바깥을 클릭하면 모달 창이 다시 들어가고 원래 상태로 돌아감
// // URL도 바뀌어야 함. URL이 바뀌면, Box도 바뀜

// // 사용자가 어디에 있든, 스크롤 된 화면에 맞게 가운데 나오도록 하기
// // 사용자의 scroll position을 알아야함
// // framer-motion에서 useScroll 씀
// // useScroll 은 object 하나를 return 해줌
// // scrollX, scrollY 의 progress 값 또는 스크롤 된 거리의 숫자 값

// ------------------------------------------------------------- //
// 9-13
// Movie Modal part Three
// 모달창에 이미지 불러오기. 미리보기

import { useQuery } from 'react-query';
import styled from 'styled-components';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto}); // 두 개의 배경 rgba, 이미지
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

// () 다음에 넣어주면 됨 <{ $bgPhoto: string }>
const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 2.5rem;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  position: relative;
  top: -80px;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5, // 사용자 화면의 크기 받아오기
  }, // 보이지 않을 때
  visible: {
    x: 0,
  }, // 보일 때
  exit: {
    x: -window.outerWidth - 5,
  }, // 사라질 때
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: 'tween',
    },
  },
};

// 한 번에 보여주고 싶은 영화의 수
const offset = 6;

// useQuery Hook 은 fetcher 를 사용해서 data 랑 아직 로딩중인지에 대한 알림을 전해준다
function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');
  // console.log(bigMovieMatch);
  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMovies
  );
  // console.log(data, isLoading);

  // 인덱스 시스템 만들기
  const [index, setIndex] = useState(0);
  // index를 증가시키는 함수
  // 전 index 를 1만큼 증가시키는 역할
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      // totalMovies 정의
      // totalMovies는 영화의 총 개수에서 하나를 뺀 값
      const totalMovies = data?.results.length - 1;
      // 갯수가 4.2 이런식으로 될수도 있으니 올림 처리 해줌
      // 영화 하나가 남아서 floor로 바꿈 하나 적게
      // page가 0에서 시작하기 때문에, maxIndex도 1 감소시킴
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      // 증가시키려고 하는 index가 이미 maxIndex라면, 0으로 되돌리고
      // 그렇지 않으면 증가
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  // leaving 을 반전시키는 역할
  const toggleLeaving = () => setLeaving((prev) => !prev);
  // Box가 클릭됐을 때 호출 될 함수
  // 이 함수는 movieId 를 argument(인자)로 받을 것임
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onOverlayClick = () => history.push('/');
  // bigMovieMatch 가 존재하는지 확인
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
  console.log(clickedMovie);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {/* 배경 이미지를 Banner 컴포넌트(bgPhoto)에 넘김 */}
          {/* bgPhoto 는 만들어진 utils에서 이미 경로여야함 */}
          {/* bgPhoto 대문자 에러때문에 $붙임 */}
          <Banner
            onClick={increaseIndex}
            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
                key={index}
              >
                {/* <Box />
                <Box />
                <Box />
                <Box />
                <Box />
                <Box /> */}
                {/* 이미 배경으로 사용한 영화는 제외 */}
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      // movie.id는 number고, layout는 string이어야 함
                      // + '' 로 간단하게 string 으로 변환
                      layoutId={movie.id + ''}
                      key={movie.id}
                      whileHover="hover"
                      initial="nomal"
                      variants={boxVariants}
                      // onClick prop에 function을 넣어줄건데
                      // onBoxClicked function 에 argument를 넘겨야 하니
                      // 익명함수 사용
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: 'tween' }}
                      $bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                {/* 두 개의 element를 return 할 수 있게 */}
                {/* 서로 붙어있는 분리 된 컴포넌트들을 반환 */}
                {/* 하나는 모달 창, 하나는 overlay */}
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  // MotionValue 에 margin 주려면 .get() 씀
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            'w500'
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;

// 사용자가 클릭한 영화 찾기
