import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class OnboardingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const onboardedBucket = new s3.Bucket(this, 'OnboardedBooksBucket', {
      bucketName: `onboardedbooks-${cdk.Aws.ACCOUNT_ID}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
    });

    const booksMetadataTable = new dynamodb.Table(this, 'BooksMetadataTable', {
      tableName: 'BooksMetadata',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const onboardFunction = new lambda.Function(this, 'OnboardFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'onboard/index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../backend/dist')),
      memorySize: 10240,
      timeout: cdk.Duration.seconds(900),
      environment: {
        ONBOARDED_BUCKET: onboardedBucket.bucketName,
      },
    });

    onboardedBucket.grantRead(onboardFunction);

    new cdk.CfnOutput(this, 'OnboardingBucketName', {
      value: onboardedBucket.bucketName,
    });

    new cdk.CfnOutput(this, 'OnboardFunctionName', {
      value: onboardFunction.functionName,
    });
  }
}
