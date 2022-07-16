# URL Shortener
URL Shortener is a web application service that lets you generate a shorter link. \
WebApp runs on two public clouds (AWS and Microsoft Azure).

## Getting started with AWS 
WebApp has been deployed to AWS. \
Url service : https://rkbvndnxqe.us-east-1.awsapprunner.com/

In the list bellow, you can see services used:
- Amazon codeCommit
    - deploy source code and compare with GitHub
    - code: ssh://git-codecommit.us-east-1.amazonaws.com/v1/repos/advize-url-shortener
- Amazon ECR
    - fully managed container registry offering high-performance hosting and deploy application images
- AWS App Runner
    - build app from ECR
    - deploy the web application automatically, load balances traffic with encryption, scales to meet the traffic needs
    - App service config:
        - Multiple request simultaneously : 80 requests
        - Instances (min): 2
        - Instances (min): 12

## Getting started with Azure 
WebApp has been deployed to Microsoft Azure. \
Url service : https://advize-url-shortener.azurewebsites.net/ \
The service is free (F1: Free)

In the list bellow, you can see services used:
- GitHub
    - deploy source code
    - code: https://github.com/flegallic/url-shortener
- Azure service plan (Linux plan)
    - similar of the container service (ACS)
    - build app from GitHub CI/CD
    - configure an Azure pipeline (ex: https://github.com/flegallic/url-shortener/actions)
    - deploys the web application automatically, load balances traffic with encryption, scales to meet the traffic needs
- Azure app service
    - config:
       - Multiple request simultaneously : 160 requests
       - Instances (min): 1
       - Instances (min): 3
