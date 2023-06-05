import React, { useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import InfoTable from "./components/InfoTable";
import SurveyChart from "./components/SurveyChart";
import Footer from "./components/Footer";
import { lazy } from "react";
import { Suspense } from "react";
import { useEffect } from "react";

// 1. 지연 로딩
const LazyImageModal = lazy(() => import("./components/ImageModal"));

// 2. 마우스 버튼에 올라왔을 때 사전 로딩
// const handleMousseEnter = () => {
//   const component = import('./components/ImageModal"');
// };

// 3. 컴포넌트 마운트 완료 후 사전 로딩
// useEffect(() => {
//   const component = import('./components/ImageModal"');
// }, []);

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <Header />
      <InfoTable />
      <ButtonModal
        // onMouseEnter={handleMousseEnter}
        onClick={() => {
          setShowModal(true);
        }}
      >
        올림픽 사진 보기
      </ButtonModal>
      <SurveyChart />
      <Footer />
      <Suspense fallback={null}>
        {showModal ? (
          <LazyImageModal
            closeModal={() => {
              setShowModal(false);
            }}
          />
        ) : null}
      </Suspense>
    </div>
  );
}

const ButtonModal = styled.button`
  border-radius: 30px;
  border: 1px solid #999;
  padding: 12px 30px;
  background: none;
  font-size: 1.1em;
  color: #555;
  outline: none;
  cursor: pointer;
`;

export default App;
