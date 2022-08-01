# README

https://techracho.bpsinc.jp/hachi8833/2022_05_26/118202 の写経用リポジトリ

# Reactのテストを書く

Jestのドキュメントを参考にする。

https://jestjs.io/ja/docs/tutorial-react

色々と野良サイトを見たりしたが、npmで以下のパッケージをインストールする。

```
npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer
```

テストを`npm run test`で動かすために`package.json`の`scripts`に以下を追記。

```json
"test": "jest"
```

テストファイルを置くところを`app/javascript/__tests__`に決めた。そこだけを見るように以下の記述を`package.json`に追記（[参考](https://jestjs.io/ja/docs/configuration#roots-arraystring)）。

```json
  "jest": {
    "roots": [
      "<rootDir>/app/javascript"
    ]
  }
```
