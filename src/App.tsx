// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Home from './Routes/Home';
// import Tv from './Routes/Tv';
// import Search from './Routes/Search';
// import Header from './Components/Header';

// function App() {
//   return (
//     <Router>
//       <Header />
//       <Switch>
//         <Route path="/tv">
//           <Tv />
//         </Route>
//         <Route path="/search">
//           <Search />
//         </Route>
//         <Route path="/">
//           <Home />
//         </Route>
//       </Switch>
//     </Router>
//   );
// }

// export default App;

// // router 순서 중요
// // <Route path="/"> (/) 만 있는 경로는 처음에 넣으면 안되고 제일 마지막에 넣어야 함
// // router 가 / 이 부분과 일치하는 부분을 찾아내는데 항상 이 부분에서 true를 반환한다
// // 모든 경로가 (/) 이렇게 시작하니까 이 부분이 위에 있으면 어느곳을 가도 home으로 감

// ------------------------------------------------------------- //
// 9-11
// Movie Modal
// Box 클릭했을 때 나오는 애니메이션 구현

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Search from './Routes/Search';
import Header from './Components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={['/', '/movies/:movieId']}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

// match를 만들기 전에 path='/' 를 배열로 바꿈
// 그럼, 라우터가 사용자가 '/'에 있을 때도 Home을 render하고
// /movies/:movieId'에 있을 때에도 Home을 render 하도록 함
// 이렇게 하면 react-router가 두 개의 path에서 같은 컴포넌트를 render하도록 할 수 있음
