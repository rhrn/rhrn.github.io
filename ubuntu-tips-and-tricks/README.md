* Default editor
```
sudo update-alternatives --set editor /usr/bin/vim.basic
```

* Config
```
lxc profile edit default
```

* Update config
```
config:
  user.user-data: |
    #cloud-config
    ssh_authorized_keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCUuAtbiXEgGKwc/ja8dsh8oSc9POlCYRqh8z1vWVw6rvfIhPwRkeLfzcIF5cKCJB26T64/ghrEanCfCS6Qo89gSYBprV7dCT+BKtmJ5GCw1mNPpRdvVFuGmOVEotoD8xnA+v3DvifRu7b9uKbx+dU6jUZ0mKmauvH2dRqp8H4qwjE+VYNgjHrJXB2Ph3NRZ+Qp/FhvYu8jqaISz6aUelI+8Yxi2HC15TJ+eCVkManPuTiNEjGYjNpOciQmncbmRLj3PJhIBLgn1T2tAxxKa9KCwi/DqcpNQEg55pwvopecOo1l5Wv7AOAamLZxqQNjUhWI8FtwrAQQWo4irO02/EuH rhrn@rhrn-eeepc
```

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

### Kubernetes


* https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/
* https://chrislovecnm.com/kubernetes/cni/choosing-a-cni-provider/
* https://kubernetes.io/docs/setup/cri/#cri-o
* https://www.projectatomic.io/blog/2017/06/using-kubeadm-with-cri-o/
* https://www.katacoda.com/courses/kubernetes/getting-started-with-kubeadm-crio
* https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/
* https://github.com/kubernetes-sigs/cri-o/blob/master/kubernetes.md
* https://github.com/kubernetes-sigs/cri-o/blob/master/tutorial.md
* https://github.com/cri-o/cri-o-ansible/blob/master/cri-o.yml
* https://github.com/containernetworking/plugins

* kubernetes
```
apt-get update && apt-get install -y apt-transport-https curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF
apt-get update
apt-get install -y kubelet kubeadm kubectl
apt-mark hold kubelet kubeadm kubectl
```

```
cat /lib/systemd/system/kubelet.service
```

* pre cri
```
modprobe overlay
modprobe br_netfilter

# Setup required sysctl params, these persist across reboots.
cat > /etc/sysctl.d/99-kubernetes-cri.conf <<EOF
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF

sysctl --system
```

* cri
```
apt-get update
apt-get upgrade
add-apt-repository ppa:projectatomic/ppa
apt-get update
apt-get install cri-o-1.12
systemctl enable crio.service
```

* commands
```
kubeadm config images pull --cri-socket="/var/run/crio/crio.sock"
kubeadm init --cri-socket="/var/run/crio/crio.sock"
kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-cert-extra-sans={{ external_ip }}

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

export KUBECONFIG=$HOME/.kube/config

kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/bc79dd1505b0c8681ece4de4c0d86c5cd2643275/Documentation/kube-flannel.yml
kubectl taint nodes --all node-role.kubernetes.io/master-
```


systemctl list-unit-files
journalctl -u kubelet
journalctl --vacuum-time=2d
```


apply network
```
FYI, I ran into the same issue and the following worked:

#re-deploy weave network (in my case)
export kubever=$(kubectl version | base64 | tr -d '\n')
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$kubever"
..then..
systemctl restart docker && systemctl restart kubelet

kubectl create namespace registry
docker run --rm --entrypoint htpasswd registry:2 -Bbn USER PASSWORD > registry_htpasswd
kubectl create secret generic registry --from-file registry_htpasswd --namespace=registry
kubectl create secret docker-registry registry-credentials --docker-server=registry3.rhrn.ru --docker-username=docker --docker-password=Tf2OfgCvDYsMYYjrFyWk8jy7EImEQkpM8i9qaPq/+dU= --docker-email=me@rhrn.ru
```

* Fix (Unable to connect to the server: x509: certificate is valid for)
```
rm /etc/kubernetes/pki/apiserver.*
kubeadm alpha phase certs all --apiserver-advertise-address=0.0.0.0 --apiserver-cert-extra-sans=xxx.xxx.xxx.xxx,yyy.yyy.yyy.yyy
docker rm -f `docker ps -q -f 'name=k8s_kube-apiserver*'`
systemctl restart kubelet
```
