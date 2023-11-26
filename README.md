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


## Build docker 

docker build -t 'chenlevin/k8s-workshop-api-gateway:latest' -f apps/api/gateway/Dockerfile.yml ./apps/api/gateway

docker push 'chenlevin/k8s-workshop-api-gateway:latest'