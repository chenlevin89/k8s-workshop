# argocd-workshop

## local env ( with volumes and watch mode )

### run 
docker-compose up -d

### open browser on 
localhost:4200 

## dev env ( without volumes and watch node // using ecr images directly )

### login to ecr account
aws ecr get-login-password  --region us-east-1

### run 
docker-compose -f docker-compose-dev.yml up -d

### open browser on 
localhost:4200

## Github actions

on every push (depend on the files changes) create and push new image with the commit id as the image tag 


# Build docker 

docker build -t 'chenlevin/k8s-workshop-api-gateway:latest' -f apps/api/gateway/Dockerfile.yml ./app/gateway

docker push 'chenlevin/k8s-workshop-api-gateway:latest'


## K8s using minikube

### run
minikube start // minikube start --memory=8192mb --cpus=4

### run (enable ingress nginx controller addon)
minikube addons enable ingress

### run (enable istio)
minikube addons enable istio-provisioner
minikube addons enable istio

### run ( on different terminal )
minikube tunnel

### run
kubectl apply -f k8s/namespace.yml
kubectl apply -f ./k8s --recursive

### watch pods ( wait until all pods are running )
kubectl -n argocd-workshop get pods --watch

### update /etc/hosts file
127.0.0.1 host.argocd-workshop.com
127.0.0.1 api.argocd-workshop.com

### open browser on 
http://host.argocd-workshop



# Istio

## Download

curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.20.0 TARGET_ARCH=x86_64 sh -

cd istio-1.20.0


Add PATH=$PWD/bin:$PATH into ~/.zsh-profiles

## Install

istioctl install --set profile=demo -y

### Add a namespace label to instruct Istio to automatically inject Envoy sidecar proxies when you deploy your application later

kubectl label ns argocd-workshop  istio-injection=enabled


# ArgoCD

## install 

kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.5.8/manifests/install.yaml


## expose argocd service ClusterIP to outside the cluster

minikube -n argocd service argocd-server --url 

## login using

username: admin
password: kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo

## install cli
brew install argocd

## login cli

export argocd_password=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)

argocd login  --insecure --username=admin --password=${argocd_password} 127.0.0.1:54173  (port return form expose argocd server command)

## Create new app and sync with local folder

for each application [mysql, api, host]

Using the UI create new application named workshop-[name] with the follow repo https://github.com/argoproj/argocd-example-apps.git

and then override it to local folder using this command 

argocd app sync workshop-mysql --local ./k8s/mysql
argocd app sync workshop-api --local ./k8s/api
argocd app sync workshop-host --local ./k8s/host


## Ensure that you have the Istio proxy (sidecar) injected to your pods

### The pod should have two containers if sidecar is injected.

kubectl get pods -n argocd-workshop <pod-name> -o=jsonpath='{.spec.containers[*].name}'



# Jaeger UI

## Enable 
cd istio-1.20.0/samples/addons
kubectl apply -f ./jaeger.yaml

## Expose on port 8080
kubectl -n istio-system  port-forward svc/tracing  8080:80