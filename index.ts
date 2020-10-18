import SQS from "aws-sdk/clients/sqs";
import SNS from "aws-sdk/clients/sns";
import DynamoDB from "aws-sdk/clients/dynamodb";
import S3 from "aws-sdk/clients/s3";
import EventBridge from "aws-sdk/clients/eventbridge";
import AWSXRay, { Segment, Subsegment } from "aws-xray-sdk-core";
import { SQSHandler, SQSEvent, SQSRecord } from "aws-lambda";

const sqs = new SQS({ region: process.env.AWS_REGION });
const sns = new SNS({ region: process.env.AWS_REGION });
const dynamoDbClient = new DynamoDB.DocumentClient();
const s3 = new S3({ region: process.env.AWS_REGION });
const eventBridge = new EventBridge({ region: process.env.AWS_REGION });

AWSXRay.captureAWSClient((dynamoDbClient as any).service);
AWSXRay.captureAWSClient(sqs);
AWSXRay.captureAWSClient(sns);
AWSXRay.captureAWSClient(s3);
AWSXRay.captureAWSClient(eventBridge);

export const startExecution: SQSHandler = async (event: SQSEvent): Promise<any> => {
    const rootSegment = AWSXRay.getSegment() as Segment;
    await Promise.all(event.Records.map(async (record: SQSRecord) => {
        const subsegment: Subsegment = rootSegment.addNewSubsegment("## xxxx");
        try {
          const sqsBody = JSON.parse(record.body);
          subsegment.addAnnotation("prop1", sqsBody.xxxx);
          subsegment.addMetadata("message", sqsBody);
          
          // DO SOMETHING
          await .....
          
        } catch (error) {
          subsegment.addError(error);
        }
        finally {
          subsegment.close();
        }
    }));
    
    return "OK";
};