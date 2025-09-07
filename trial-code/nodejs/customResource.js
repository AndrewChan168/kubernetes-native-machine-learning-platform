/**
 * make sure you have applied
 * kubectl apply -f crd.yaml
 * before running this program
 */

const k8s = require('@kubernetes/client-node');


// create KubeConfig instance & load content
const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();

const k8sCrApi = kubeConfig.makeApiClient(k8s.CustomObjectsApi);

// details of Custom Resource
const namespace = 'trial';
const version = 'v1';
const group = 'andrcha3.com';
const plural = 'samples';
const customResource = {
    apiVersion: `${group}/${version}`,
    kind: 'Sample',
    metadata: {
        name: 'trial-sample'
    },
    spec: {
        value: 101
    },
};

const main = async () => {
    try {
        // create service from YAML
        const createCrResponse = await k8sCrdApi.createNamespacedCustomObject({
            group,
            version,
            namespace, 
            plural,
            body: customResource
        });
        console.log('Created Custom Resource Sample');
        console.log(createCrResponse);

        // list all custom resources in namespace
        const listCrResponse = await k8sCrdApi.listClusterCustomObject({namespace, group, plural, version});
        console.log(listCrResponse);

        // get specific custom resource
        // you will get error at this status with error message: Unknown API Status Code!
        const getCrResponse = await k8sCrdApi.getClusterCustomObject({group, version, plural, namespace, name:customResource.metadata.name});
        console.log(getCrResponse);

        // delete specific custom resource
        // you will get error at this status with error message: Unknown API Status Code!
        const deleteCrResponse = await k8sCrdApi.deleteClusterCustomObject({group, version, plural, namespace, name:customResource.metadata.name});
        console.log(deleteCrResponse);
    } catch (err) {
        console.log(err);
    }
};

main();