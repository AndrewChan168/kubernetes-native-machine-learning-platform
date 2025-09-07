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
        const createCrResponse = await k8sCrApi.createNamespacedCustomObject({
            group,
            version,
            namespace, 
            plural,
            body: customResource
        });
        console.log('Created Custom Resource Sample');
        console.log(createCrResponse);

        // list all custom resources in namespace
        const listCrResponse = await k8sCrApi.listClusterCustomObject({namespace, group, plural, version});
        console.log(listCrResponse);

        // get specific custom resource
        const getCrResponse = await k8sCrApi.getNamespacedCustomObject({group, version, plural, namespace, name:customResource.metadata.name});
        console.log(getCrResponse);

        // delete specific custom resource
        const deleteCrResponse = await k8sCrApi.deleteNamespacedCustomObject({group, version, plural, namespace, name:customResource.metadata.name});
        console.log(deleteCrResponse);
    } catch (err) {
        console.log(err);
    }
};

main();