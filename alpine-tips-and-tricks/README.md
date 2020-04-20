* https://wiki.alpinelinux.org/wiki/Docker

* apk add kubernetes
* apk add ebtables ethtool socat iproute2

* from https://github.com/kubernetes-sigs/cri-tools
``` crictl
VERSION="v1.12.0"
wget https://github.com/kubernetes-sigs/cri-tools/releases/download/$VERSION/crictl-$VERSION-linux-amd64.tar.gz
tar zxvf crictl-$VERSION-linux-amd64.tar.gz -C /usr/local/bin
rm -f crictl-$VERSION-linux-amd64.tar.gz
```

* disable swap
* setup-disk -s 0

*
apk add go git make musl-dev containerd

export GOPATH=$HOME/go

