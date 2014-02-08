### Shell tips and tricks

* Show parent process id
```
ps -o ppid= {pid}
```

* Show process file by name
```
ps -p {pid} -o comm=
```