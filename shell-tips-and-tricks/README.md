### Shell tips and tricks

* Show parent process id
```
ps -o ppid= {pid}
```

* Show process file by name
```
ps -p {pid} -o comm=
```

* Show opened ports
```
sudo netstat -nlp
sudo ss -nlpt # or
```

* Sort ps output by memory
```
ps aux --sort -rss
```

* Gen certificates pair
```
openssl req -nodes -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 9999 -subj '/CN=localhost'
```

* Show certificate expiration
```
openssl s_client -showcerts -connect {host}:{port} </dev/null | openssl x509 -noout -dates
```

* Check certificates on match
```
openssl x509 -noout -modulus -in server.crt | openssl md5
openssl rsa -noout -modulus -in server.key | openssl md5
openssl req -noout -modulus -in server.csr | openssl md5
```

* Change terminal size. Useful for android adb shell
```
stty rows 60 cols 156
```

* Full copy directory
```
rsync -avxHAX --progress / /new-disk/
```

* Show disk usage by directories inlcude hidden
```
du -sch .[!.]* * | sort -h
```

* Round png image
```
convert -size 512x512 xc:none -fill white -draw 'roundRectangle 0,0 512,512 50,50' in.png -compose SrcIn -composite rounded.png
```

* ssh tunnel from remote `localhost:8080` to local machine `localhost:8082`
```
ssh -N -f -L 8082:localhost:8080 user@remote_ip_address
```
