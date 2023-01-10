
# Pong-V2

This is a simple Pong browser game.

You can find the source code [here](https://github.com/matthias020/pong-v2/ "GitHub").  

## How to run

This game needs to run on a (local) webserver such as Apache for it to work. This is due to Cross-Origin Resource Sharing (CORS) restrictions.

A tutorial on how to install and set up Apache for Linux systems can be found [here](https://www.makeuseof.com/tag/set-apache-web-server-3-easy-steps "makeuseof.com").  
A tutorial on how to install and set up Apache for Windows can be found [here](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Install-Apache-Web-Server-24-Windows-10-ServerRoot-Error "theserverside.com").

After finishing the tutorial for your system, the default `/var/www/html/index.html` file can be deleted and the contents of this project can then be copied into the `/var/www/html/` folder. In Windows, this folder can be found at `C:\Apache24\htdocs\`.

This project contains an `icons/` folder. When using Apache on Linux with a default configuration, the logo within this directory cannot be loaded due to an alias in the `/etc/httpd/conf/extra/httpd-autoindex.conf` configuration file. The following line:

```
Alias /icons/ "/usr/share/httpd/icons/"
```

needs to be commented<sup>1</sup> out to fix this issue.  

## License

This project has been made open-source under the [GNU AGPLv3](https://www.gnu.org/licenses/agpl-3.0.html "gnu.org") license. See the LICENSE.md file in the root of this project.  

## Footnotes

1. To comment a line out, "#" needs to be inserted at the beginning of the line.
