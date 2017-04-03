#include <stdio.h>
#include <stdlib.h>

int main(int argc, char** argv)
{
    puts("Starting Google Chrome headless browser...");
    system("google-chrome --headless --no-sandbox --disable-gpu --remote-debugging-port=9222 --load-extension=/ait-files/browser-extension &");
    system("sleep 1");
    
    puts("Starting Nodejs user behavior...");
    system("node /ait-files/user-behavior.js");

    return 0;
}

