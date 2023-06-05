# Olympic Statistics Service Optimization

유동균, '웹 개발 스킬을 한 단계 높여 주는 프론트엔드 성능 최적화 가이드', 제 2장 올림픽 통계 서비스 최적화 기반의 실습 및 요약 레포지토리입니다. 크롬 개발자 도구의 Performace, Lighthouse, Network 패널을 이용하여 성능 측정 후 최적화 작업을 진행하였습니다.

## Getting Started

#### install dependencies

```
$ npm install
or
$ yarn
```

#### start development server

```
$ npm run start
or
$ yarn start
```

#### start json-server

```
$ npm run server
or
$ yarn server
```

#### build + serve

```
$ npm run serve
or
$ yarn serve
```

## Problems - Solutions

- [ ] Reflow & Repaint - Optimize Animation (Hardware Acceleration)
- [ ]
- [ ]
- [ ]

## `Hardware Acceleration`

하드웨어 가속은 컴퓨터의 특정 하드웨어 부분, 특히 그래픽 처리 장치(GPU)를 사용하여 애플리케이션의 성능을 향상시키는 것을 말합니다. 이것은 특히 그래픽 표현 및 애니메이션과 같은 고성능 작업에 유용하며, CSS 애니메이션의 경우에도 마찬가지입니다.

CSS 애니메이션의 최적화를 위해 하드웨어 가속을 사용하는 방법은 크게 다음과 같습니다:

1. Transforms 사용: `translate3d`, `scale3d`, `rotate3d` 등의 3D 변환을 사용하면 브라우저가 이러한 요소를 GPU로 보내려고 시도합니다. 이는 2D 변환과 비교해 더 효과적이라고 여겨집니다. 3D 변환을 사용하면 요소가 그래픽 카드에서 별도의 레이어로 처리되므로 복잡한 애니메이션에 대한 성능이 향상됩니다.

2. will-change Property 사용: `will-change` 속성은 브라우저에게 어떤 요소가 변할 것이라는 것을 미리 알려주는 것입니다. 예를 들어, `will-change: transform;`이나 `will-change: opacity;`를 사용하면 브라우저가 해당 요소에 대한 변경 사항을 미리 예상하고 이를 최적화할 수 있습니다.

3. Backface-visibility Property 사용: `backface-visibility` 속성을 `hidden`으로 설정하면 3D 변환 중에 요소의 뒷면이 보이지 않도록 하여 성능을 향상시킬 수 있습니다.

4. Avoid Layout Thrashing: 레이아웃 스래싱은 스크립트가 실행되는 동안 레이아웃 계산이 여러 번 일어나는 현상을 의미합니다. 이를 피하려면 한 번에 모든 스타일 변경을 수행하고, 다음 프레임까지 기다린 후에 읽기 작업을 수행해야 합니다.

주의해야 할 것은, GPU를 오버로드하면 반대효과가 나타날 수 있으므로 모든 것에 하드웨어 가속을 적용하는 것은 좋지 않습니다. 필요한 곳에만 적절하게 사용해야 합니다.

#### `Reflow` & `Repaint`

웹 페이지에서 reflow와 repaint는 브라우저 렌더링 과정 중 일어나는 중요한 이벤트들입니다. 이 두 가지 작업은 웹 페이지의 성능에 큰 영향을 미칠 수 있으므로, 이해하고 최적화하는 것이 중요합니다.

1. Reflow:
   Reflow는 레이아웃 또는 지오메트리 변경 시 발생하는 과정으로, DOM 요소의 크기와 위치를 계산하는 것을 말합니다. 예를 들어, 요소의 크기나 위치를 변경하거나, 페이지를 처음 로드하거나, 브라우저 창의 크기를 조절하는 등의 작업이 있습니다.

Reflow는 연산이 많기 때문에 상당히 비용이 많이 드는 작업으로 간주되며, 웹사이트의 성능에 부정적인 영향을 미칠 수 있습니다. 따라서 필요한 경우에만 reflow를 발생시키고, 불필요한 reflow를 피하는 것이 중요합니다.

2. Repaint:
   Repaint는 요소의 모양이 바뀔 때(예를 들어, 색상이나 그림자 등) 발생하는 과정입니다. 이 과정에서 브라우저는 배경, 텍스트, 이미지, 테두리 등의 표시를 다시 그립니다.

Reflow와는 달리, Repaint는 레이아웃 변경이 없으므로 성능에 미치는 영향이 상대적으로 덜합니다. 그러나 이 작업도 고비용 작업이므로, 꼭 필요한 경우에만 발생시키는 것이 바람직합니다.

이 두 가지 작업은 최적화에서 중요한 역할을 하는데, 가능한 한 덜 발생시키는 것이 성능 향상에 도움이 됩니다. 예를 들어, CSS 애니메이션을 최적화하려면 transform과 opacity 변경만을 이용하면 됩니다. 이는 이들 변경 사항이 reflow나 repaint를 발생시키지 않기 때문입니다.

## `Lazy Loading`

컴포넌트 지연 로딩(Lazy Loading)은 일반적으로 웹 페이지나 애플리케이션의 초기 로딩 시간을 줄이는 데 사용되는 기술입니다. 지연 로딩은 필요한 컴포넌트나 데이터를 바로 로딩하지 않고, 사용자가 해당 컴포넌트나 데이터를 필요로 할 때에만 로딩하는 방법을 의미합니다.

이 방법은 특히 웹 애플리케이션의 성능 최적화에 도움이 됩니다. 웹 페이지가 많은 양의 JavaScript 또는 복잡한 컴포넌트를 가지고 있을 때, 모든 컴포넌트를 한번에 로딩하려고 하면 사용자는 웹페이지가 완전히 로드될 때까지 오랜 시간을 기다려야 할 수 있습니다. 반면에 지연 로딩을 사용하면 필요한 부분만 로드하여 초기 로딩 시간을 크게 단축시킬 수 있습니다.

예를 들어, React에서는 `React.lazy`와 `Suspense`를 사용하여 컴포넌트 지연 로딩을 수행할 수 있습니다. 이를 사용하면 컴포넌트를 분할하고, 해당 컴포넌트가 실제로 렌더링될 필요가 있을 때에만 번들로부터 로드할 수 있습니다.

지연 로딩은 초기 로드 시간을 줄이는 데 뿐만 아니라, 불필요한 네트워크 대역폭 사용을 줄이고, 사용자의 데이터를 절약하는 등 여러가지 이점이 있습니다.

```javascript
import React, { Suspense } from "react";

const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```
