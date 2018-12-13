# TLDR

A sample express/vue TODO app deployed in Kubernetes with ISTIO service mesh.

Goal is to evaluate ISTIO Service Mesh in the context of the three below scenarios: 

1) In a single Google Cloud account we have an Web UI and API application. We want to measure traffic and apply security rules. 
2) Expose the API from the above (step 1) Google Cloud account via sensible method - authentication might be OAUTH, Mutual TLS or simply API Key - we want to understand what's available
3) Create another Google Cloud account (but within the same organisation) and try to consume the API from the above account (step 1) and have available the same level of analytics and security as in step 1. 

![scenarios](https://raw.githubusercontent.com/RafalJachimczyk/todoapp-istio-kubernetes/master/docs/gcp%20app.png)


## Installing Istio in Kubernetees

1) Launch your GCP panel and Activate Cloud Shell

2) Create new ISTIO cluster

```
gcloud container clusters create istio-tutorial     --machine-type=n1-standard-2     --num-nodes=4 
    --no-enable-legacy-authorization --zone=europe-west1-b
```

3) grant cluster admin permissions to the current user. You need these permissions to create the necessary role based access control (RBAC) rules for Istio:

```
kubectl create clusterrolebinding cluster-admin-binding   --clusterrole=cluster-admin   --user="$(gcloud config get-value core/account)"
```

4) Install Istio

https://cloud.google.com/kubernetes-engine/docs/tutorials/installing-istio#step_1_install_istio

4.5) Add ISTIO to $PATH

```
export PATH=$PWD/bin:$PATH
```

5) Verify Istio installation https://cloud.google.com/kubernetes-engine/docs/tutorials/installing-istio#step_2_verify_istio_installation

6) Clone TODO app into your Google Cloud Shell

```
$ git clone https://github.com/RafalJachimczyk/todoapp-istio-kubernetes.git
```
7) Inject Istio image into TODO app manifest file 

```
istioctl kube-inject -f todo.yaml -o todo-ist
io.yaml
```

7) Deploy TODO app into your new Cluster

```
$ cd todoapp-istio-kubernetes/src/

$ kubectl apply -f todo-istio.yaml
```

8) Find your ingress gateway IP address 

```
$ kubectl get svc istio-ingressgateway -n istio
-system
```

9) Hit the Todos App

```

$ export GATEWAY_URL=xxx.xxx.xxx.xxx:80

$ curl -vv -I http://${GATEWAY_URL}/todos

```

10) Check out the Grafana (or other services)

```
kubectl -n istio-system port-forward $(kubectl -n istio-system get pod -l app=grafana -o jsonpath='{.items[0].metadata.name}') 3000:3000 &
```


## References

https://cloud.google.com/kubernetes-engine/docs/tutorials/installing-istio