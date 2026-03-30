#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { WebsiteStack } from './lib/WebsiteStack';
import { OnboardingStack } from './lib/OnboardingStack';

const app = new cdk.App();

const stackEnv = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
};

new WebsiteStack(app, 'BooksWebsiteStack', stackEnv);
new OnboardingStack(app, 'OnboardingStack', stackEnv);