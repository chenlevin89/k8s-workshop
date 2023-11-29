1. Are you using Istio as service mesh and expose Virtual services
2. How do you manage canary and A/B deployments
3. Are you using application api gateway
    3.1 how do you manage routes configuration 
        3.1.1 regarding deployments for new endpoint
        3.1.2 per service ? per endpoint ?
4. Where do you manage 
    4.1 CORS
    4.2 Auth
    4.3 Rate limit
    4.4 Retries
    4.5 Routing rules
    4.6 Cache
5. How do you communicate between service ( are u moving through the api gateway )
    5.1 are you apply rate limit on inner services requests
    5.2 are u moving through the mesh routing rules
6. How do you manage requests that required data form multiple services ? 
   6.1 are you using orchestrator service ?
   6.2 how do you manage validation ( federated validations )
7. How do you manage api breaking changes ?
8. Scaling approach ( keda / knative ) ?
9. How do you mange failure request to multiple services ( like transaction rollbacks )  








# High Level Design
1. Async communication ( event driven design )
2. Istio tace id passing and login