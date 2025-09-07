const k8s = require('@kubernetes/client-node');

// create KubeConfig instance & load content
const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();

// create API client for later usage
const k8sV1Api = kubeConfig.makeApiClient(k8s.CoreV1Api);

// detail of pod to be created
const pod = {
    metadata: {
        name: 'demo-pod',
        labels: {
            name: 'proxy'
        },
    },
    spec: {
        containers: [
            {
                name: 'nginx-container',
                image: 'nginx',
            },
        ],
    },
};
const namespace = 'trial';

const main = async () => {
    try {
        // create pod
        const createPodResponse = await k8sV1Api.createNamespacedPod({ 
            namespace,
            body: pod,
        });
        console.log("Created pod");
        console.log(createPodResponse);

       // list all pods
       const listPodsResponse = await k8sV1Api.listNamespacedPod({ namespace:namespace });
       console.log("All pods:");
       console.log(listPodsResponse);

       // get the created pod
       const getPodResponse = await k8sV1Api.readNamespacedPod({namespace:namespace, name:pod.metadata.name});
       console.log("get the created pod:");
       console.log(getPodResponse);

       // delete the created pod
       /*
       const deletePodResponse = await k8sV1Api.deleteNamespacedPod({ namespace:namespace, name:pod.metadata.name});
       console.log("deleted the pod:");
       console.log(deletePodResponse);
       */
    } catch (err) {
        console.log(err);
    }
}

main()