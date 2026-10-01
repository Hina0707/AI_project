# NutriTrack

React + TypeScript + Vite 화면과 Express 서버로 만든 식단 기록 앱입니다. 음식 검색, 일일 영양 합계, 주간 통계, 목표 설정, 엑셀 내보내기를 제공합니다. 식단과 목표는 현재 브라우저의 로컬 저장소에 저장됩니다.

## Windows에서 실행

Node.js와 npm이 설치된 환경에서 `NutriTrack` 폴더를 VS Code로 열고 PowerShell 터미널에 입력합니다.

```powershell
npm.cmd install
npm.cmd run dev
```

브라우저에서 **http://localhost:3000/** 을 엽니다. 터미널을 실행한 상태로 두고, 종료할 때는 `Ctrl+C`를 누릅니다. 다음 실행부터는 `npm.cmd run dev`만 입력하면 됩니다.

| 명령어 | 용도 |
| --- | --- |
| `npm.cmd run dev` | React 화면과 검색 API 개발 서버 실행 |
| `npm.cmd run build` | 타입 검사 후 배포용 화면 파일을 `dist`에 생성 |
| `npm.cmd run lint` | TypeScript 타입 검사 |
| `npm.cmd start` | 빌드한 화면과 검색 API 서버 실행 |

배포용 빌드를 로컬에서 확인하려면 개발 서버를 `Ctrl+C`로 종료한 뒤 실행합니다. 접속 주소는 동일합니다.

```powershell
npm.cmd run build
npm.cmd start
```

## 선택 사항: Gemini 검색

**API 키 없이도 내장 음식 데이터 검색과 식단 기록을 사용할 수 있습니다.** Gemini를 이용한 추가 검색이 필요하면 프로젝트 폴더의 `.env.example`을 `.env`로 복사한 다음 키를 입력하고 서버를 재시작합니다.

```dotenv
GEMINI_API_KEY=본인의_API_키
PORT=3000
```

`GEMINI_API_KEY`는 Express 서버에서만 사용합니다. `.env`와 실제 API 키는 GitHub에 올리지 마세요. 키에 `VITE_` 접두사를 붙이거나 React 코드에 직접 넣지 마세요. Gemini 검색 결과는 AI가 생성한 추정값이며, 특정 영양 정보 서비스의 데이터베이스에 직접 연결한 결과가 아닙니다.

## GitHub 웹사이트에 올리기

1. 함께 제공된 `NutriTrack-GitHub-upload.zip`의 압축을 풉니다. 직접 소스를 고른다면 아래 업로드 항목을 참고합니다.
2. GitHub에 로그인하고 새 저장소를 만듭니다. 저장소 이름은 예를 들어 `NutriTrack`으로 정하고 공개 여부를 선택합니다.
3. 빈 저장소의 **uploading an existing file** 링크 또는 **Add file → Upload files**를 엽니다.
4. 압축을 푼 소스 폴더와 파일을 업로드합니다. `package.json`이 저장소 최상위에 오도록 해당 파일이 있는 폴더 **안의 항목**을 선택합니다.
5. 변경 설명에 `Add NutriTrack project` 등을 입력하고 화면의 커밋 버튼으로 저장합니다.

업로드할 항목:

- `src/`, `public/`
- `package.json`, `package-lock.json`
- `index.html`, `server.ts`, `vite.config.ts`, `tsconfig.json`
- `README.md`, `.gitignore`, `.env.example`, `metadata.json`

`node_modules/`, `dist/`, `.git/`, `.env` 및 실제 키가 담긴 환경 파일, 로그 파일은 제외합니다. `.gitignore`는 Git 명령으로 추가할 파일을 걸러 주므로, **브라우저에서 직접 업로드할 때도 제외할 항목을 직접 확인해야 합니다.** ZIP 파일을 그대로 올리면 압축이 풀리지 않으므로 소스 폴더와 파일을 올립니다. [GitHub 파일 업로드 안내](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)

저장소에 코드를 올리는 것만으로 앱 서버가 실행되지는 않습니다. 이 앱의 `/api/search-nutrition`은 Node.js 서버가 필요합니다. [GitHub Pages는 정적 사이트 호스팅](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)이므로 전체 앱을 인터넷에 공개하려면 Node.js 서버를 실행할 수 있는 별도 배포 환경이 필요합니다.
