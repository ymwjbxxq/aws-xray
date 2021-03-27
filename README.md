# AWS #

„[AWS X-Ray]( https://aws.amazon.com/xray/) helps developers analyze and debug production, distributed applications, such as those built using a microservices architecture. With X-Ray, you can understand how your application and its underlying services are performing to identify and troubleshoot the root cause of performance issues and errors. X-Ray provides an end-to-end view of requests as they travel through your application, and shows a map of your application’s underlying components. You can use X-Ray to analyze both applications in development and production, from simple three-tier applications to complex microservices applications consisting of thousands of services.“

### Introduction ###

My first try with X-Ray was mid-2019 and at that time [AWS Step Function]( https://aws.amazon.com/step-functions/) was not supported and finally on Sep 14, 2020 [AWS Step Functions adds support for AWS X-Ray](https://aws.amazon.com/about-aws/whats-new/2020/09/aws-step-functions-adds-support-for-aws-x-ray/), so I decided to give a second try, after all, we are in the 2020 and AWS X-Ray was in all their talk how great it is with serverless applications etc.

### [Integrating AWS X-Ray with other AWS services](https://docs.aws.amazon.com/xray/latest/devguide/xray-services.html) ###

As you can see there are a lot of services and a lot that is missing. Let’s stay serverless and let’s take the example posted on this repository.
I am not going to rewrite all so please refer to the official documentation.


### [Amazon SQS and AWS X-Ray](https://docs.aws.amazon.com/xray/latest/devguide/xray-services-sqs.html) ###

You have services that send an SQS message to service so you expect that the traceId would be the same, or that you can have one nice service map, but NO!!!! SQS is not fully supported

### [Amazon SNS and AWS X-Ray](https://docs.aws.amazon.com/xray/latest/devguide/xray-services-sns.html) ###

Unless it is connected directly to the Lambda function, and not to an SQS the trace again is interrupted (back to SQS)

### [Amazon API Gateway active tracing support for AWS X-Ray](https://docs.aws.amazon.com/xray/latest/devguide/xray-services-apigateway.html) ###

The documentation does not say it or even mention it in small text in a corner ;) but HTTP API is not supported only by the REST type.

### [Configuring groups in the X-Ray console](https://docs.aws.amazon.com/xray/latest/devguide/xray-console-groups.html?icmpid=docs_xray_console) ###

Very useful if you want to find something that you want to track but, I was expecting to apply the groups also on the Service Map but it works if the groups filter expression are created before trace and no updates to the expression were made.
This means that group filtering on Service Map cannot be used retrospectively.

### What is missing? ###

If we are not considering the problems with the “supported” services I think we need full support for:

* SQS to be fully integrated with SNS, EventBridge and Lambda.
* EventBridge support.
* DynamoDB stream support.
* API Gateway to be fully supported.
* Enable "groups" also in Service Map.
* Enable the re-ordering of the nodes in Service Map.

### Is it worth? ###

**Definitely.**
Even if there are issues here and there, I am confident that in the next 6-12 months all the serverless services will be supported.

I am using AWS X-Ray every day to review the performances of my lambda functions, before and after any deployment and found something that pushes me to re-think certain flows.
