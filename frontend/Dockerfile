# syntax=docker/dockerfile:1.4

# 開発環境用のイメージ作成
FROM node:lts-buster 

# 作業ディレクトリの設定
WORKDIR /usr/src/app

# パッケージファイルをコピーして依存関係をインストール
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm ci

# ソースコード全体をコピー
COPY . /usr/src/app

# 開発用ポートの公開
EXPOSE 3000

# 開発用コマンド
CMD ["npm", "start"]
