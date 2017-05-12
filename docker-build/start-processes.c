#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char** argv)
{
    puts("Starting Python3 server...");
    system("python3 -m http.server 9000 &");
    system("sleep 3");

    puts("Starting Google Chrome headless browser...");
    //system("google-chrome --headless --no-sandbox --disable-gpu --enable-logging=stderr --v=INFO --remote-debugging-port=9222 &");
    //system("google-chrome --headless --no-sandbox --disable-gpu --disable-web-security --enable-profile-shortcut-manager --user-data-dir=/monitoring_output/chrome-user-test --enable-logging --v=INFO --remote-debugging-port=9222 &");
    system("google-chrome --headless --no-sandbox --disable-gpu --disable-web-security --remote-debugging-port=9222 &");

    system("sleep 3");

    puts("Starting Nodejs script...");
    system("node user-behavior.js &");
    system("sleep 3");
    
    puts("Starting ait_cyclon...");
    char *exe_path = "/ait_cyclon";
    int idx;
    int len = (strlen(exe_path)) + 4;
    for(idx = 1; idx < argc; idx++){
        len += (strlen(argv[idx])) + 1;
    }
    
    char cmd[len];
    strcpy(cmd, exe_path);
    strcat(cmd, " ");
    for(idx = 1; idx < argc; idx++){
        strcat(cmd, argv[idx]);
        strcat(cmd, " ");
    }
    strcat(cmd, "\0");
    system(cmd);
    
    //puts("Starting Google Chrome headless browser...");
    //system("google-chrome --headless --no-sandbox --disable-gpu --user-data-dir=/monitoring_output/chrome_log --enable-extension-activity-logging --enable-logging --v=1 --remote-debugging-port=9222 --load-extension=/ait-files/browser-extension");
    //system("google-chrome --headless --no-sandbox --disable-gpu --remote-debugging-port=9222 --load-extension=/ait-files/browser-extension");
    //system("google-chrome --headless --no-sandbox --disable-gpu --remote-debugging-port=9222 --load-extension=/ait-files/browser-extension");
    return 0;
}
