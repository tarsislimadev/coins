FROM tmvdl/android:app

WORKDIR /app

RUN cordova create coins com.brtmvdl.coins coins

WORKDIR /app/coins

COPY www/html www

RUN cordova platform add android

RUN cordova build android
