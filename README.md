# TLDR

A sample express/vue TODO app deployed in Kubernetes with ISTIO service mesh.

## Installing Istio in Kubernetees

1) Launch your GCP panel and Activate Cloud Shell

2) Create new ISTIO cluster

`gcloud container clusters create istio-tutorial     --machine-type=n1-standard-2     --num-nodes=4 
    --no-enable-legacy-authorization --zone=europe-west1-b`

3) grant cluster admin permissions to the current user. You need these permissions to create the necessary role based access control (RBAC) rules for Istio:

`kubectl create clusterrolebinding cluster-admin-binding   --clusterrole=cluster-admin   --user="$(g
cloud config get-value core/account)"`

4) Install Istio

https://cloud.google.com/kubernetes-engine/docs/tutorials/installing-istio#step_1_install_istio

4.5) Add ISTIO to $PATH

`export PATH=$PWD/bin:$PATH`

5) Verify Istio installation https://cloud.google.com/kubernetes-engine/docs/tutorials/installing-istio#step_2_verify_istio_installation

6) Clone TODO app into your Google Cloud Shell

```
$ git clone https://github.com/RafalJachimczyk/todoapp-istio-kubernetes.git
```
7) Inject Istio image into TODO app manifest file 

`istioctl kube-inject -f todo.yaml -o todo-ist
io.yaml`

7) Deploy TODO app into your new Cluster

```
$ cd todoapp-istio-kubernetes/src/

$ kubectl apply -f todo-istio.yaml
```

8) Find your ingress gateway IP address 

`$ kubectl get svc istio-ingressgateway -n istio
-system`

9) Let the magic happen 

```

$ export GATEWAY_URL=35.233.69.246:80

$ curl -vv -I http://${GATEWAY_URL}/todos

```



## References

https://cloud.google.com/kubernetes-engine/docs/tutorials/installing-istio