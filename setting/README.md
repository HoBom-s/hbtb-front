# FrontEnd Setting

1. Node

   - Version 16.17.0
   - node -v, npm -v로 버전 확인

2. vue-cli

   - npm i -g @vue/cli
   - vue --version으로 버전 확인

3. Extensions

   - Vuetur 설치
   - Eslint 설치

4. Project Settings

   - github > hbtb-front
   - setting 폴더의 pre-commit 파일을 `.git/hooks` 폴더에 붙여넣기
   - Vetur setting
     - .vscode 폴더 > settings.json에 다음 내용 추가
     ```json
     "vetur.format.options.tabSize": 2,
     "vetur.format.defaultFormatterOptions": {
        "prettyhtml": {
           "printWidth": 80
        },
        "prettier": {
           "semi": true,
           "printWidth": 80
        }
     }
     ```
