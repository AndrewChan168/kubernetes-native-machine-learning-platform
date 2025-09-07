const k8s = require('@kubernetes/client-node');

// create KubeConfig instance & load content
const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();

// create API client for later usage
const k8sV1Api = kubeConfig.makeApiClient(k8s.CoreV1Api);

// create namespace and show the detail of namespace
const namespace = {
    metadata: {
        name: 'trial',
    }
};

const main = async () => {
    try {
        // create namespace
        const createNamespaceResponse = await k8sV1Api.createNamespace({ body:namespace });
        console.log("Created namespace");
        console.log(createNamespaceResponse);


        // list all namespaces
        const listNamespacesRespond = await k8sV1Api.listNamespace();
        listNamespacesRespond.items.map((n)=>console.log(n));

        // get the created namespaces
        const getNamespaceResponse = await k8sV1Api.readNamespace({name:namespace.metadata.name});
        console.log("The namespace got");
        console.log(getNamespaceResponse);

        // delete the namespace
        /*
        const deleteNamespaceResponse = await k8sV1Api.deleteNamespace({name:namespace.metadata.name});
        console.log("Deleted namespace!");
        console.log(deleteNamespaceResponse);
        */
    } catch (err) {
        console.log(err);
    }
}

main()