* Apply shell config
```
source ~/.zshrc
```

* Restart touchpad
```
sudo modprobe -r psmouse
sudo modprobe psmouse
```

* Pate on middle tap
```
synclient TapButton3=3 TapButton2=2
```

* Get current version
```
lsb_release -a
```

* set locale
```
locale # show current locale
locale-gen en_US.utf8
update-locale LANG=en_US.utf8 LANGUAGE=en_US.utf8 LC_ALL=en_US.utf8
```

* set timezone
```
cat /etc/timezone # show current timezone
sudo dpkg-reconfigure tzdata
```
