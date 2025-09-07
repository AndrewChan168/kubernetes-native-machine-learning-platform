const k8s = require('@kubernetes/client-node');
const fs = require('fs');

// create KubeConfig instance & load content
const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();

// create API client for later usage
const k8sV1Api = kubeConfig.makeApiClient(k8s.CoreV1Api);

const main = async () => {
    try {
        // create service from YAML
        const serviceYAML = k8s.loadYaml(fs.readFileSync('./service.yaml'));
        const createServiceResponse = await k8sV1Api.createNamespacedService({namespace:'trial', body:serviceYAML});
        console.log(createServiceResponse);
        
        // delete created service
        /*
        const deleteServiceResponse = await k8sAPI.deleteNamespacedService({name:"nginx-service", namespace:"trial"});
        console.log(deleteServiceResponse);
        */
    } catch (err) {
        console.log(err);
    }
}

main()