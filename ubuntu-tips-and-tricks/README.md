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


* add ipv6 support
```
ip -6 addr add public_ipv6_address/64 dev eth0
ip -6 route add default via public_ipv6_gateway dev eth0
```

* put /etc/network/interfaces
```
iface eth0 inet6 static
  address primary_ipv6_address
  netmask 64
  gateway ipv6_gateway
  autoconf 0
  dns-nameservers 2001:4860:4860::8844 2001:4860:4860::8888
```
