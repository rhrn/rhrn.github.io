* Setting tag on an image
```
sudo docker tag 5db5f8471261 rhrn/ubuntu:webdev
```

* Get bash inside runned container
```
sudo docker exec -i -t 665b4a1e17b6 bash
```

* Launch docker virtual machines with static `https://github.com/docker/machine/issues/1709#issuecomment-161026484`
```
docker-machine create -d virtualbox --virtualbox-hostonly-cidr "192.168.96.1/24" vhost3 # 192.168.96.100
docker-machine create -d virtualbox --virtualbox-hostonly-cidr "192.168.97.1/24" vhost2 # 192.168.97.100
docker-machine create -d virtualbox --virtualbox-hostonly-cidr "192.168.98.1/24" vhost1 # 192.168.98.100
```

* Clear docker unused images
```
docker rmi $(docker images -f "dangling=true" -q)
```

* Clear docker exited containers
```
docker rm $(docker ps -aq -f status=exited)
```
