# syntax=docker/dockerfile:1.4

# 開発環境用のイメージ作成
FROM node:lts-buster AS development

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

# 本番環境用イメージ
FROM node:lts-buster AS production

# 作業ディレクトリの設定
WORKDIR /usr/src/app

# 依存関係をインストール
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm ci --only=production

# ソースコード全体をコピーし、ビルド
COPY . /usr/src/app
RUN npm run build

# 本番用に serve をインストールして、静的ファイルを配信
RUN npm install -g serve

# 必要なポートを公開（Heroku用）
EXPOSE 5000

# 静的ファイルを配信するコマンドを設定
CMD ["serve", "-s", "build", "-l", "5000"]