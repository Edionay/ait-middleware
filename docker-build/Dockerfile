FROM ubuntu:latest

# Install npm and nodejs.
RUN apt-get -y update && apt-get -yq install curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
apt-get install -yq nodejs build-essential && npm install -g npm

# Install dependencies.
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
libxtst6 \
libappindicator1 \
wget \
xdg-utils

# Download Google Chrome.
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

# Install google-chrome.
RUN dpkg -i google-chrome-stable_current_amd64.deb && \
rm -f google-chrome-stable_current_amd64.deb

# Adding needed files.
ADD ait_cyclon start-processes.c user-behavior.js ait-docker-webpage/ /

# Adding Nodejs script dependency and compiling Standard-C file.
RUN npm install chrome-remote-interface && gcc start-processes.c -o start-processes

# Run C executable which starts the gossip overlay and sets up the browser.
ENTRYPOINT [ "/start-processes" ]

# Default parameter to ENTRYPOINT
CMD [ "--help" ]

# Other useful commands.
#CMD echo "google-chrome version:" && /usr/bin/google-chrome --version && \
#echo "npm version:" && /usr/bin/npm --version && \
#echo "nodejs version:" && /usr/bin/nodejs --version
