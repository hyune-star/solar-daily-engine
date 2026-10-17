# solar-daily-engine

매일 아침 메일로 오는 「태양광 핵심문제」 시험지의 **화면 엔진**입니다.

메일에 첨부되는 작은 HTML 파일에는 그날의 날짜, 동향 요약, 10문제만 들어 있습니다. 파일을 열면 이 저장소의 `engine.js`와 `engine.css`를 jsDelivr로 불러와 시험지 화면, 채점, 계산기, 정답 보기를 그립니다.

- `engine.js`: 화면, 채점, 재도전, 계산기, 찾기, 인쇄
- `engine.css`: 디자인 (라이트 / 다크 모드)
- 첨부 파일은 `main` 브랜치의 엔진을 불러옵니다 (jsDelivr 주소: https://cdn.jsdelivr.net/gh/hyune-star/solar-daily-engine@main/engine.js).

이 저장소에는 문제, 내가 쓴 답, 점수, 개인정보가 저장되지 않습니다. 답안과 점수 기록은 파일을 연 사람의 브라우저(localStorage)에만 남습니다.
