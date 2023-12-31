# k8s-workshop

## Minikube

### run
minikube start --memory=8192mb --cpus=4

### run ( on different terminals )
minikube tunnel
minikube dashboard

### run
kubectl apply -f k8s/namespace.yml
kubectl apply -f ./k8s --recursive

### watch pods ( wait until all pods are running )
kubectl -n k8s-workshop get pods --watch

### Expose host (web app) service

kubectl -n k8s-workshop port-forward svc/web-app-service 4200:4200



## Istio

### Download cli

curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.20.0 TARGET_ARCH=x86_64 sh -

cd istio-1.20.0

Add PATH=$PWD/bin:$PATH into ~/.zsh-profiles

### Install

istioctl install --set profile=demo -y

### Add a namespace label to instruct Istio to automatically inject Envoy sidecar proxies when you deploy your application later

kubectl delete -f ./k8s --recursive

kubectl apply -f k8s/namespace.yml

kubectl label ns k8s-workshop  istio-injection=enabled

kubectl apply -f ./k8s --recursive


### update /etc/hosts file
127.0.0.1 host.k8s-workshop.com
127.0.0.1 api.k8s-workshop.com


## Jaeger UI

### Enable 
cd istio-1.20.0/samples/addons
kubectl apply -f ./jaeger.yaml

### Expose on port 8080
kubectl -n istio-system  port-forward svc/tracing  8080:80


## Build docker 

docker build -t 'chenlevin/k8s-workshop-api-gateway:latest' -f apps/api/gateway/Dockerfile.yml ./apps/api/gateway

docker push 'chenlevin/k8s-workshop-api-gateway:latest'



## Branches

feature/k8s
feature/istio
feature/istio-routing-rules
feature/istio-advanced-rules
feature/istio-ratelimit
feature/istio-ratelimit-ip-address


## Lucid

https://lucid.app/lucidchart/b55c5093-788b-4cc5-9666-bc5974897fad/edit?viewport_loc=-181%2C-507%2C3186%2C1779%2C0_0&invitationId=inv_33c263cb-237f-4066-afa3-86e4b6635918