FROM ubuntu:latest
MAINTAINER Vinicius Lima "viniciusdasilva@inf.ufg.br"

# Install npm and nodejs.
RUN apt-get -y update && apt-get -yq install curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
apt-get install -yq nodejs build-essential && npm install -g npm

# Install google-chrome dependencies.
RUN apt-get install -yq \
fonts-liberation \
gconf-service \
libasound2 \
libatk1.0-0 \
libcairo2 \
libcups2 \
libdbus-1-3 \
libfontconfig1 \
libfreetype6 \
libgconf-2-4 \
libgdk-pixbuf2.0-0 \
libgtk2.0-0 \
libnspr4 \
libnspr4-0d \
libnss3 \
libnss3-1d \
libpango1.0-0 \
libx11-xcb1 \
libxcomposite1 \
libxss1 \
libxtst6  \
libappindicator1 \
wget \
xdg-utils

# Download Google Chrome.
RUN mkdir -p ait-files/browser-extension && \
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
mv google-chrome-stable_current_amd64.deb ait-files/google-chrome-stable_current_amd64.deb

# Install google-chrome.
RUN dpkg -i ait-files/google-chrome-stable_current_amd64.deb

# Adding JS Script file and Standard-C file.
ADD user-behavior.js start-processes.c ait-files/
ADD browser-extension/ ait-files/browser-extension/

# Adding Nodejs script dependency and compiling Standard-C file.
RUN cd ait-files/ && npm install chrome-remote-interface && \
gcc start-processes.c -o start-processes

# Run C executable which sets up the headless browser and starts the nodejs script.
CMD ["/ait-files/start-processes"]

# Other useful commands.
#CMD echo "google-chrome version:" && /usr/bin/google-chrome --version && \
#echo "npm version:" && /usr/bin/npm --version && \
#echo "nodejs version:" && /usr/bin/nodejs --version
