"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingStack = void 0;
const path = require("path");
const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const s3 = require("aws-cdk-lib/aws-s3");
class OnboardingStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const onboardedBucket = new s3.Bucket(this, 'OnboardedBooksBucket', {
            bucketName: `onboardedbooks-${cdk.Aws.ACCOUNT_ID}`,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED,
            versioned: true,
            removalPolicy: cdk.RemovalPolicy.RETAIN,
            autoDeleteObjects: false,
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
exports.OnboardingStack = OnboardingStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT25ib2FyZGluZ1N0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiT25ib2FyZGluZ1N0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZCQUE2QjtBQUM3QixtQ0FBbUM7QUFFbkMsaURBQWlEO0FBQ2pELHlDQUF5QztBQUV6QyxNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDNUMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLGVBQWUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQ2xFLFVBQVUsRUFBRSxrQkFBa0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7WUFDbEQsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFNBQVM7WUFDakQsVUFBVSxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVO1lBQzFDLFNBQVMsRUFBRSxJQUFJO1lBQ2YsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTTtZQUN2QyxpQkFBaUIsRUFBRSxLQUFLO1NBQ3pCLENBQUMsQ0FBQztRQUVILE1BQU0sZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDbkUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3ZFLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDbEMsV0FBVyxFQUFFO2dCQUNYLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxVQUFVO2FBQzdDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUUzQyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQzlDLEtBQUssRUFBRSxlQUFlLENBQUMsVUFBVTtTQUNsQyxDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFO1lBQzdDLEtBQUssRUFBRSxlQUFlLENBQUMsWUFBWTtTQUNwQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFsQ0QsMENBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcclxuaW1wb3J0ICogYXMgczMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBPbmJvYXJkaW5nU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgIGNvbnN0IG9uYm9hcmRlZEJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ09uYm9hcmRlZEJvb2tzQnVja2V0Jywge1xyXG4gICAgICBidWNrZXROYW1lOiBgb25ib2FyZGVkYm9va3MtJHtjZGsuQXdzLkFDQ09VTlRfSUR9YCxcclxuICAgICAgYmxvY2tQdWJsaWNBY2Nlc3M6IHMzLkJsb2NrUHVibGljQWNjZXNzLkJMT0NLX0FMTCxcclxuICAgICAgZW5jcnlwdGlvbjogczMuQnVja2V0RW5jcnlwdGlvbi5TM19NQU5BR0VELFxyXG4gICAgICB2ZXJzaW9uZWQ6IHRydWUsXHJcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LlJFVEFJTixcclxuICAgICAgYXV0b0RlbGV0ZU9iamVjdHM6IGZhbHNlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgb25ib2FyZEZ1bmN0aW9uID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnT25ib2FyZEZ1bmN0aW9uJywge1xyXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMThfWCxcclxuICAgICAgaGFuZGxlcjogJ29uYm9hcmQvaW5kZXguaGFuZGxlcicsXHJcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vLi4vYmFja2VuZC9kaXN0JykpLFxyXG4gICAgICBtZW1vcnlTaXplOiAxMDI0MCxcclxuICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoOTAwKSxcclxuICAgICAgZW52aXJvbm1lbnQ6IHtcclxuICAgICAgICBPTkJPQVJERURfQlVDS0VUOiBvbmJvYXJkZWRCdWNrZXQuYnVja2V0TmFtZSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIG9uYm9hcmRlZEJ1Y2tldC5ncmFudFJlYWQob25ib2FyZEZ1bmN0aW9uKTtcclxuXHJcbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnT25ib2FyZGluZ0J1Y2tldE5hbWUnLCB7XHJcbiAgICAgIHZhbHVlOiBvbmJvYXJkZWRCdWNrZXQuYnVja2V0TmFtZSxcclxuICAgIH0pO1xyXG5cclxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdPbmJvYXJkRnVuY3Rpb25OYW1lJywge1xyXG4gICAgICB2YWx1ZTogb25ib2FyZEZ1bmN0aW9uLmZ1bmN0aW9uTmFtZSxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=